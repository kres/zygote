//This contains the javascript functions that map to the REST URIs used to access resources on the hardware.
//The users call these functions in their webpage and the functions will access the appropriate resources through the Flask server.
//IMPORTANT: This module uses jQuery so include that in your scripts before using this.

//TODO : In the functions, sanity check if the user enters the right parameters, before sending an ajax.

zygote = {}

//this gives us the sub directory under which the service is available 
zygote.server = "/board/"
//eg.	GET	host:port/board/gpio/GPIO1_22


//---------------GPIO---------------
zygote.gpio = {

	resource : "gpio", //name of the resource
	
	url : zygote.server + "gpio" + "/", //base url for gpio
	
	config : function (pinName, mode, params, callback) {

		var configPin =  this.url + pinName;
	
		params = params || {};
		params['mode'] = mode;
		var paramData = $.param(params);
	
		callback = callback || function() {};
	
		$.ajax({
			url : configPin,
			type : "PUT",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	},

	read : function (pinName, params, callback) {

		var readPin =  this.url + pinName;
	
		params = params || {};
		var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : readPin,
			type : "GET",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	},

	write : function (pinName, status, params, callback) {

		var writePin =  this.url + pinName;
	
		params = params || {};
		params['status'] = status;
		var paramData = $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : writePin,
			type : "POST",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	}
}

//---------------PWM---------------
zygote.pwm = {

	resource : "pwm", //name of the resource	
	url : zygote.server + "pwm" + "/", //base url for pwm 
	
	config : function (pinName, enable, params, callback) {

		var configPin = this.url + pinName;
	
		params = params || {};
		params['status'] = status;
		var paramData = $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : configPin,
			type : "PUT",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message)
			},
			complete : callback
		});
	
	},

	write : function (pinName, value, params, callback) {

		var writePin = this.url + pinName;
	
		params = params || {};
		params['value'] = value;
		var paramData = $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : writePin,
			type : "POST",
			data: paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message)
			},
			complete : callback
		});
	}
}


//---------------SERVO---------------
zygote.servo = {

	resource : "servo", //name of the resource	
	url : zygote.server + "servo" + "/", //base url for servo
	
	config : function (pinName, enable, params, callback) {

		var configPin = this.url + pinName;
	
		params = params || {};
		params['enable'] = enable;
		var paramData = $.param(params);
	
		callback = callback || function() {};
	
		$.ajax({
			url : configPin,
			type : "PUT",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	},

	read : function (pinName, params, callback) {

		var readPin = this.url+ pinName;
	
		params = params || {};
		var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : readPin,
			type : "GET",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	},

	write : function (pinName, angle, params, callback) {

		var writePin = this.url + pinName;
	
		params = params || {};
		params['angle'] = angle;
		var paramData = $.param(params);
	
		callback = callback || function() {};
		 
		$.ajax({
			url : writePin,
			type : "POST",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	}
}

//---------------AIN---------------
zygote.ain = {

	resource : "ain", //name of the resource	
	url : zygote.server + "ain" + "/", //base url for analog in
	
	config : function (pinName, enable, params, callback) {

		var configMode = "enable=" + enable;
		var configPin = this.url + pinName;
	
	
		params = (typeof params === "undefined") ? {} : params;
		var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
		callback = (typeof callback === "undefined") ? function() {} : callback;
	
		$.ajax({
			url : configPin,
			type : "PUT",
			data : configMode + "&" + paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	},

	read : function (pinName, params, callback) {

		var readPin = this.url + pinName;
	
		params = (typeof params === "undefined") ? {} : params;
		var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
		callback = (typeof callback === "undefined") ? function() {} : callback;
		 
		$.ajax({
			url :  readPin,
			type : "GET",
			data : paramData,
			success : function (response) {
				console.log(response);
			},
			error : function (error) {
				console.log(error.message);
			},
			complete : callback
		});
	
	}
}

