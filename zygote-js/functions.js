//This contains the javascript functions that map to the REST URIs used to access resources on the hardware.
//The users call these functions in their webpage and the functions will access the appropriate resources through the Flask server.
//IMPORTANT: This module uses jQuery so include that in your scripts before using this.

zygote = {}
//For testing purposes, use testServer.php it just prints the URL on the console.
zygote.server = "testServer.php"

//Uncomment this when required.
//zygote.server = "server.py"

//---------------GPIO---------------
zygote.GPIOconfig = function (pinName, mode, params, callback) {

	var configPin = "/gpio/" + pinName;
	
	params = params || {};
	params['mode'] = mode;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	
	$.ajax({
		url : server + configPin,
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
	
}

zygote.GPIOread = function (pinName, params, callback) {

	var readPin = "/gpio/" + pinName;
	
	params = params || {};
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + readPin,
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

zygote.GPIOwrite = function (pinName, status, params, callback) {

	var writePin = "/gpio/" + pinName;
	
	params = params || {};
	params['status'] = status;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + writePin,
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

//---------------PWM---------------
zygote.PWMconfig = function (pinName, enable, params, callback) {

	var configPin = "/pwm/" + pinName;
	
	params = params || {};
	params['status'] = status;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + configPin,
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
	
}

zygote.PWMwrite = function (pinName, value, params, callback) {

	var writePin = "/pwm/" + pinName;
	
	params = params || {};
	params['value'] = value;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + writePin,
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

//---------------SERVO---------------
zygote.SERVOconfig = function (pinName, enable, params, callback) {

	var configPin = "/servo/" + pinName;
	
	params = params || {};
	params['enable'] = enable;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	
	$.ajax({
		url : server + configPin,
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
	
}

zygote.SERVOread = function (pinName, params, callback) {

	var readPin = "/servo/" + pinName;
	
	params = params || {};
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + readPin,
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

zygote.SERVOwrite = function (pinName, angle, params, callback) {

	var writePin = "/servo/" + pinName;
	
	params = params || {};
	params['angle'] = angle;
	var paramData = $.param(params);
	
	callback = callback || function() {};
	 
	$.ajax({
		url : server + writePin,
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

//---------------AIN---------------
function AINconfig(pinName, enable, params, callback) {

	var configMode = "enable=" + enable;
	var configPin = "/ain/" + pinName;
	
	
	params = (typeof params === "undefined") ? {} : params;
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
	callback = (typeof callback === "undefined") ? function() {} : callback;
	
	$.ajax({
		url : server + configPin,
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
	
}

function AINread(pinName, params, callback) {

	var readPin = "/ain/" + pinName;
	
	params = (typeof params === "undefined") ? {} : params;
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
	callback = (typeof callback === "undefined") ? function() {} : callback;
	 
	$.ajax({
		url : server + readPin,
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
