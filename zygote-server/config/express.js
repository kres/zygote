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
	app.use(jsonify);

	app.use("/static", express.static(__dirname+"/../static")); //handle static routes
	
	//add our routes to it
	require('../app/routes/routes.js')(app);

	//return express obj with our settings
	return app;
};

function jsonify(req, res, next){
	if((req.method != 'GET') && (typeof(req.body) == 'string')){
		try{
			req.body = JSON.parse(req.body);
		}
		catch(e){
			res.status(400).send({"error": "request body not json format"});
			return;
		}
	}
	next();
}
