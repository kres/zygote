// All requests to '/container/*' is routed here.
// Includes GET, POST, PUT, DEL. forwards to the correct model.

module.exports = function (req, res) {
		
		//get the model that handles all the json data
		var model = require("../models/index.js");
		
		//callback function called by the module method
		var callback = function (result) {
				//this could do something more complex later
				res.send(result);
			};

		//forward the request to the model
		switch(req.method){
			case 'GET':
				//req.params[0] => gives path following "container/"
				model.read(req.params[0], req.query, callback);
			break;

			case 'PUT':
				model.update(req.params[0], req.body, callback);
			break;

			case 'POST':
				model.write(req.params[0], req.body, callback);
			break;

			case 'DELETE':
			//I don't think there is a body reqd here
				model.del(req.params[0]);
			break;
		}
		
	}
