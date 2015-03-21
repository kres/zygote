//handles all outgoing data; meant for resources not onboard
//complements the local_controller.js file
//exposes read-write-config interface.
//handles events it gets from the socket
//will r-w-c from loacl_controller and also create-delete res in it

var conf = require("./conf.js");
var lc = require("./local_controller");
var exe_engine = require("./exe_unit.js");

//gatway is basically the socket interface
var gateway = null;

exports.start = function start(server){

	var socket = require('socket.io-client')(server);

	socket.on('connect', function(){
		console.log('connected to zygote as url : ' + conf.url);
		socket.emit('url', {"url" : conf.url});
		gateway = socket;

		socket.on('data', function(rpc_struct, callback){
			console.log(rpc_struct);
			var ep = rpc_struct['ep'];
			if(rpc_struct['op'] == 'read'){
				lc.read(ep, rpc_struct['data'], callback);
			}
			else if(rpc_struct['op'] == 'write'){
				lc.write(ep, rpc_struct['data'], callback);
			}
			else if(rpc_struct['op'] == 'config'){
				lc.config(ep, rpc_struct['data'], callback);
			}
			else{
				callback({"error":"operation not supported"});
			}

		});

		socket.on('spec', function(rpc_struct, callback){
			//here no point of rpc_struct
			callback(conf['spec']);
		});

		socket.on('create', function(rpc_struct, callback){
			//create a resource
			var ep = rpc_struct['ep'];
			console.log("Create called");
			lc.create(ep, rpc_struct['data'], callback);
		});

		socket.on('delete', function(rpc_struct, callback){
			//remove a resource
			var ep = rpc_struct['ep'];
			console.log("Delete called");
			lc.delete(ep, rpc_struct['data'], callback);
		});

		//XXX : deprecated
		/*
		socket.on('execute', function(rpc_struct, callback){
			exe.execute(rpc_struct['code']);
			callback({"status":"executing"});
		});
		*/

		socket.on('flow-create', function(flow_set, callback){
			//flow set is a set of struct of 'flows'; each keyed by a flowid
			//flow is a json object that defines the flow. i.e.
			// flow-id : { "flow" : "<js-code>", "trigger" : {}, ...}
			console.log("FLOW-received. Sending to execution engine")
			for(flow_id in flow_set){
				exe_engine.execute(flow_id, flow_set[flow_id]);
			}
			callback({"status" : "ok"});
		});

		socket.on('flow-delete', function(flow_ids, callback){
			//flow_ids is a list of flow id's
			exe_engine.destroy(flow_ids[0]);
			
			//how to handle failure of couple of deletes?
			callback({"status" : "ok"});
		});

	});
}

//export read-write-config
exports.read = function(rpc_struct, callback){
	rpc_struct['op'] = 'read';
	//callback is a fn that takes one param --> viz resulting_data
	gateway.emit("data", rpc_struct, callback);
}

exports.write = function(rpc_struct, callback){
	rpc_struct['op'] = 'write';
	//callback is a fn that takes one param --> viz resulting_data
	gateway.emit("data", rpc_struct, callback);
}

exports.config = function(rpc_struct, callback){
	rpc_struct['op'] = 'config';
	//callback is a fn that takes one param --> viz resulting_data
	gateway.emit("data", rpc_struct, callback);
}
