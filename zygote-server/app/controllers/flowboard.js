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
			"flow-id" : {
				"flow" : "<code-string>",
				"target" : "<container-name>",
				"trigger" : {
					"type"  : "['timer'|'event']",
					"val" : "['number'|'url']", //number=> time in sec, url=>'gpio/1'
					"obj"	:  [<timer-obj> | <event-emmiter-obj>] //filled on client side
					"event" : "name-of-event" //only for event emitter types
				},
				"code" : <function-obj> //generated code (by client), includes trigger
			}
		}

	*/
	var flow_set = req.body;
	
	for(flow_id in flow_set){
		console.log("Flow id : " +flow_id);
		var target = flow_set[flow_id]['target'];

		if(target in data.spec || target == "dashboard"){
			sc.execute(target, flow_set, function(data){
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

	if(target in data.spec || target == "dashboard"){
		sc.delete_flow(target, flow_id, function(data){
			res.json(data);
		});
	}
}