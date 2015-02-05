var express = require('express');

module.exports = function() {

	//get the actual express module
	var app = express();

	//other modules 
	var bodyParser = require('body-parser');
	var multer = require('multer');

	app.use(bodyParser.text()); // for parsing plain text
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(multer()); // for parsing multipart/form-data

	
	//add our routes to it
	require('../app/routes/routes.js')(app);

	//return express obj with our settings
	return app;
};
