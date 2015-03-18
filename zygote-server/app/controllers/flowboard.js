//post new js code to execute
//format??
// {'target' : 'bbb', script="<well,the script... duh!>"}

var data = require("./data.js");
var sc = require("./socket_handler.js");

exports.post = function(req, res){
	//handles post request
	console.log("code posted to flowboard");

	/*
		flow_set : 
		{
			"flow-id" : {...} //one and one only
		}
	*/
	var flow_set = req.body['flows'];
	
	for(flow_id in flow_set){
		var target = flow_set[flow_id]['target'];

		if(target in data.spec){
			sc.execute(target, flow_struct, function(data){
				res.json(data);
			});
		}
		else{
			res.json({"error" : "container does not exist"});
		}

		break;//incase there are more than one flows.....
	}
}

exports.delete = function(req, res){
	console.log("flow deleted from flowboard");

	/*
		incoming object : 
		{
			'flow-id' : <flow-id>,
			'target' : <container>
		}
	*/

	var flow_id = req.body['flow_id'];
	var target = req.body['target'];

	if(target in data.spec){
		sc.delete_flow(target, flow_id, function(data){
			res.json(data);
		});
	}
}