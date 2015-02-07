// All requests to '/container/*' is routed here.
// Includes GET, POST, PUT, DEL. forwards to the correct model.

module.exports = function (req, res) {
		
		//get the model that handles all the json data
		var model = require("../models/index.js");
		
		//callback function called by the module method
		var callback = function (result, action) {
				//this could do something more complex later
				
				if(result == undefined){
					res.status(404).send('Not Found');
				}
				else{
                    
					if (action && ('ep' in action)){
						//add new ep to routes
						req.app.all('/container'+ action['ep'], require('./res_instance.js'));
					}
					res.send(result);
				}
			};

		//forward the request to the model
		//XXX: should I just pass response to the model fn instead of callbacks?
		switch(req.method){
			case 'GET':
				//req.params[0] => gives path following "container/"
				//EG : if input url is '/container/bbb/gpio/'; we pass 'bbb/gpio'
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
