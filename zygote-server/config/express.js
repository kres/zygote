var express = require('express');

module.exports = function() {

	//get the actual express module
	var app = express();

	//add our routes to it
	require('../app/routes/routes.js')(app);

	//return express obj with our settings
	return app;
};
