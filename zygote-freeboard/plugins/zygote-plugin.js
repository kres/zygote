( function() {
	
	freeboard.loadDatasourcePlugin({
		type_name : "zygoteDataSource",
		display_name : "Zygote DataSource",
		description : "Get data from your hardware."
		external_scripts: [
			"../../zygote-js/functions.js"
		]
		settings: [
			{
				name: "url",
				display_name: "URL",
				type: "text",
				description: "The URL of your zygote server."
			},
			{
				name: "pinType",
				display_name: "Pin Type",
				type: "option",
				options: [
					{
						name: "GPIO",
						value: "gpio"
					},
					{
						name: "AIN",
						value: "ain"
					}
					{
						name: "SERVO",
						value: "servo"
					}
					//No 'GET' request for PWM pins.
				]
			},
			{
				name: "pinNumber",
				display_name: "Pin Number",
				type: "text",
				description: "Use the pin number as in the REST URL."
			},
			{
				name: "configParams",
				display_name: "Configuration Parameters",
				type: "array",
				description: "To send these parameters with the configuration request.",
				settings: [
					{
						name: "key",
						display_name: "Key",
						type: "text"
					},
					{
						name: "value",
						display_name: "Value",
						type: "text"
					},
				]
				
			},
			{
				name: "readParams",
				display_name: "Read Parameters",
				type: "array",
				description: "To send these parameters with the read request.",
				settings: [
					{
						name: "key",
						display_name: "Key",
						type: "text"
					},
					{
						name: "value",
						display_name: "Value",
						type: "text"
					},
				]
				
			},
			{
				"name"         : "refreshTime",
				"display_name" : "Refresh Time",
				"type"         : "text",
				"description"  : "In milliseconds",
				"default_value": 5000
			}
		],
		newInstance   : function(settings, newInstanceCallback, updateCallback)
		{
			newInstanceCallback(new zygoteDataSourcePlugin(settings, updateCallback));
		}
	});

	var zygoteDataSourcePlugin = function (settings, updateCallback){
		var self = this;
		var currSettings = settings;
		var refreshTimer = null;
		
		function createRefreshTimer(interval)
		{
			if(refreshTimer)
			{
				clearInterval(refreshTimer);
			}

			refreshTimer = setInterval(function()
			{
				// Here we call our getData function to update freeboard with new data.
				self.updateNow();
			}, interval);
		}
		
		self.updateNow = function ()
		{
			var returnVal;
			
			//Call the appropriate functions from function.js (the zygote js API).
			var params = {}
			for each (entry in currentSettings.readParams) {
				params[entry.key] = entry.value;
			}
			console.log(params);
			
			//Configuration is done here.
			if(currentSettings.pinType == "gpio")
			{
				returnVal = zygote.GPIORead(currentSetting.pinNumber, params, null);
			}
			else if(currentSettings.pinType == "ain")
			{
				returnVal = zygote.AINRead(currentSetting.pinNumber, params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				returnVal =zygote.SERVORead(currentSetting.pinNumber, params, null);
			}
			
			updateCallback(returnVal);
		}
		
		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
			
			params = {}
			for each (entry in currentSettings.configParams) {
				params[entry.key] = entry.value;
			}
			console.log(params);
			
			//Configuration is done here.
			if(currentSettings.pinType == "gpio")
			{
				zygote.GPIOConfig(currentSetting.pinNumber, "read", params, null);
			}
			else if(currentSettings.pinType == "ain")
			{
				zygote.AINConfig(currentSetting.pinNumber, "enable", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.SERVOConfig(currentSetting.pinNumber, "enable", params, null);
			}
		}
		
		self.onDispose = function()
		{
			clearInterval(refreshTimer);
			refreshTimer = undefined;
			
			//Configuration is done here.
			if(currentSettings.pinType == "ain")
			{
				zygote.AINConfig(currentSetting.pinNumber, "disable", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.SERVOConfig(currentSetting.pinNumber, "disable", params, null);
			}
		}
		
		createRefreshTimer(currentSettings.refreshTime);
	}
	
	freeboard.loadWidgetPlugin({
		type_name : "zygoteReadWidget",
		display_name : "Zygote Read Widget",
        description : "Displays data read from a datasource.",
		external_scripts: [
			"../../zygote-js/functions.js"
		],
		fill_size : false,
		settings : [
			{
				name: "response",
				type: "calculated",
				display_name: "Latest Response"
			}
		],
		
		newInstance   : function(settings, newInstanceCallback)
		{
			newInstanceCallback(new zygoteReadWidgetPlugin(settings));
		}
	});
	
	var zygoteReadWidgetPlugin = function(settings)
	{
		var self = this;
		var currentSettings = settings;

		var myTextElement = $("<span></span>");

		self.render = function(containerElement)
		{
			$(containerElement).append(myTextElement);
		}

		self.getHeight = function()
		{
			return 1;
		}

		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
		}

		self.onCalculatedValueChanged = function(settingName, newValue)
		{
			if(settingName == "the_text")
			{
				$(myTextElement).html(newValue);
			}
		}

		self.onDispose = function()
		{
		}
	}
	
	
}());