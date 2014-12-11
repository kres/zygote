( function() {
	
	var postData = {};
	
	freeboard.loadDatasourcePlugin({
		type_name : "zygoteDataSource",
		display_name : "Zygote Data Source",
		description : "Get data from your hardware.",
		external_scripts: [
			"js/zygote_functions.js"
		],
		settings: [
			{
				name: "id",
				display_name: "ID",
				type: "text",
				description: "Just for your reference."
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
					},
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
					} 
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
		var currentSettings = settings;
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
			function callback(response)
			{
				var update = {}; 
				update.data = response;
				console.log(update);
				updateCallback(update);
			}
			
			//Call the appropriate functions from function.js (the zygote js API).
			var params = {}
			for (var i = 0; i < currentSettings.readParams.length; ++i) {
				entry = currentSettings.readParams[i]
				params[entry.key] = entry.value;
			}
			
			console.log(params);
			
			//Configuration is done here.
			if(currentSettings.pinType == "gpio")
			{
				zygote.gpio.read(currentSettings.pinNumber, params, callback);
			}
			else if(currentSettings.pinType == "ain")
			{
				zygote.ain.read(currentSettings.pinNumber, params, callback);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.read(currentSettings.pinNumber, params, callback);
			}
			
		}
		
		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
			
			var params = {}
			for (var i = 0; i < currentSettings.configParams.length; ++i) {
				entry = currentSettings.configParams[i]
				params[entry.key] = entry.value;
			}
			
			console.log(params);
			
			//Configuration is done here.
			if(currentSettings.pinType == "gpio")
			{
				zygote.gpio.config(currentSettings.pinNumber, "INPUT", params, null);
			}
			else if(currentSettings.pinType == "ain")
			{
				zygote.ain.config(currentSettings.pinNumber, "true", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.config(currentSettings.pinNumber, "true", params, null);
			}
		}
		
		self.onDispose = function()
		{
			clearInterval(refreshTimer);
			refreshTimer = undefined;
			
			//Configuration is done here.
			if(currentSettings.pinType == "ain")
			{
				zygote.ain.config(currentSettings.pinNumber, "false", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.config(currentSettings.pinNumber, "false", params, null);
			}
		}
		
		self.onSettingsChanged(settings);
		createRefreshTimer(currentSettings.refreshTime);
	}
	
	freeboard.loadWidgetPlugin({
		type_name : "zygoteReadWidget",
		display_name : "Zygote Read Widget",
        description : "Displays data read from a datasource.",
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
			if(settingName == "response")
			{
				$(myTextElement).html(newValue);
			}
		}

		self.onDispose = function()
		{
		}
		
		self.onSettingsChanged(settings);
	}
	
	freeboard.loadDatasourcePlugin({
		type_name : "zygoteDataGenerator",
		display_name : "Zygote Data Generator",
		description : "Post data to your hardware.",
		external_scripts: [
			"js/zygote_functions.js"
		],
		settings: [
			{
				name: "id",
				display_name: "ID",
				type: "text",
				description: "The ID you will use in your widget to access this."
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
						name: "PWM",
						value: "pwm"
					},
					{
						name: "SERVO",
						value: "servo"
					}
					//No 'POST' request for AIN pins.
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
				name: "writeParams",
				display_name: "Write Parameters",
				type: "array",
				description: "To send these EXTRA parameters with the POST request.",
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
			newInstanceCallback(new zygoteDataGeneratorPlugin(settings, updateCallback));
		}
	});
	
	var zygoteDataGeneratorPlugin = function (settings, updateCallback){
		var self = this;
		var currentSettings = settings;
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
			function callback(response) 
			{
				var update = {}; 
				update.data = response;
				console.log(update);
				updateCallback(update);	
			} 
			
			//Call the appropriate functions from function.js (the zygote js API).
			var params = {}
			for (var i = 0; i < currentSettings.writeParams.length; ++i) {
				entry = currentSettings.writeParams[i]
				params[entry.key] = entry.value;
			}
			
			console.log(params);
			
			//Get data from the widget...using the generator name.
			data = postData[currentSettings.id];
			
			if (!data)
				return;
			
			if(currentSettings.pinType == "gpio")
			{
				zygote.gpio.write(currentSettings.pinNumber, data, params, callback);
			}
			else if(currentSettings.pinType == "pwm")
			{
				zygote.pwm.write(currentSettings.pinNumber, data, params, callback);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.write(currentSettings.pinNumber, data, params, callback);
			}
			
		}
		
		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
			
			var params = {}
			for (var i = 0; i < currentSettings.configParams.length; ++i) {
				entry = currentSettings.configParams[i]
				params[entry.key] = entry.value;
			}
			
			console.log(params);
			
			//Configuration is done here.
			if(currentSettings.pinType == "gpio")
			{
				zygote.gpio.config(currentSettings.pinNumber, "OUTPUT", params, null);
			}
			else if(currentSettings.pinType == "pwm")
			{
				zygote.gpio.config(currentSettings.pinNumber, "true", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.config(currentSettings.pinNumber, "true", params, null);
			}
		}
		
		self.onDispose = function()
		{
			clearInterval(refreshTimer);
			refreshTimer = undefined;
			
			//Configuration is done here.
			if(currentSettings.pinType == "pwm")
			{
				zygote.ain.config(currentSettings.pinNumber, "false", params, null);
			}
			else if(currentSettings.pinType == "servo")
			{
				zygote.servo.config(currentSettings.pinNumber, "false", params, null);
			}
		}
		
		self.onSettingsChanged(settings);
		createRefreshTimer(currentSettings.refreshTime);
	}
	
	freeboard.loadWidgetPlugin({
		type_name : "zygoteWriteWidget",
		display_name : "Zygote Write Widget",
        description : "Takes data input to write to hardware.",
		fill_size : false,
		settings : [
			{
				name: "id",
				type: "text",
				display_name: "Generator ID",
				description: "The generator that will send the post requests."
			},
			{
				name: "value",
				type: "text",
				display_name: "Value",
				description: "To post to the data generator."
			}
		],
		
		newInstance   : function(settings, newInstanceCallback)
		{
			newInstanceCallback(new zygoteWriteWidgetPlugin(settings));
		}
	});
	
	var zygoteWriteWidgetPlugin = function(settings)
	{
		var self = this;
		var currentSettings = settings;

		var myTextElement = $("<span></span>");
		
		self.render = function(containerElement)
		{
			$(myTextElement).html("Posting Value: " + currentSettings.value);
			$(containerElement).append(myTextElement);
		}

		self.getHeight = function()
		{
			return 1;
		}

		self.onSettingsChanged = function(newSettings)
		{
			currentSettings = newSettings;
			postData[currentSettings.id] = currentSettings.value;
			$(myTextElement).html("Settings Changed: " + currentSettings.id + " : " + currentSettings.value);
			
		}

		self.onCalculatedValueChanged = function(settingName, newValue)
		{
		}

		self.onDispose = function()
		{
		}
		
		self.onSettingsChanged(settings);
	}
}());
