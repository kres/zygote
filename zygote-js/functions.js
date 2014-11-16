//This contains the javascript functions that map to the REST URIs used to access resources on the hardware.
//The users call these functions in their webpage and the functions will access the appropriate resources through the Flask server.
//IMPORTANT: This module uses jQuery so include that in your scripts before using this.

//For testing purposes, use testServer.php it just prints the URL on the console.
server = "testServer.php"

//Uncomment this when required.
//server = "server.py"

//---------------GPIO---------------
function GPIOconfig(pinName, mode, params, callback) {

	var configPin = "/gpio/" + pinName;
	var configMode = "mode=" + mode;
	
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

function GPIOread(pinName, params, callback) {

	var readPin = "/gpio/" + pinName;
	
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

function GPIOwrite(pinName, status, params, callback) {

	var writePin = "/gpio/" + pinName;
	var writeData = "status=" + status;
	
	params = (typeof params === "undefined") ? {} : params;
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
	callback = (typeof callback === "undefined") ? function() {} : callback;
	 
	$.ajax({
		url : server + writePin,
		type : "POST",
		data : writeData + "&" + paramData,
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
function PWMconfig(pinName, enable, params, callback) {

	var configPin = "/pwm/" + pinName;
	var configMode = "enable=" + enable;
	
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
			console.log(error.message)
		},
		complete : callback
	});
	
}

function PWMwrite(pinName, value, params, callback) {

	var writePin = "/pwm/" + pinName;
	var writeData = "value=" + value;
	
	params = (typeof params === "undefined") ? {} : params;
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
	callback = (typeof callback === "undefined") ? function() {} : callback;
	 
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
function SERVOconfig(pinName, enable, params, callback) {

	var configMode = "enable=" + enable;
	var configPin = "/servo/" + pinName;
	
	
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

function SERVOread(pinName, params, callback) {

	var readPin = "/servo/" + pinName;
	
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

function SERVOwrite(pinName, angle, params, callback) {

	var writePin = "/servo/" + pinName;
	var writeData = "angle=" + angle;
	
	params = (typeof params === "undefined") ? {} : params;
	var paramData = ($.isEmptyObject(params)) ? "" : $.param(params);
		
	callback = (typeof callback === "undefined") ? function() {} : callback;
	 
	$.ajax({
		url : server + writePin,
		type : "POST",
		data : writeData + "&" + paramData,
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
