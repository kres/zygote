//this file handles the socket connection to the zygote server
//uses socket.io browser side client library to make the communication.

//socket handler namespace 
var sh = {};

//io() should automatically figure out where to connect
//I don't want to hardcode for localhost
var socket = io();
socket.on('connect', function(){
	console.log("Connected to the Server");
	socket.emit('url', {'url' : 'dashboard'});

	/**
	 * This event is emitted by the server to get 
	 * updated 'spec'(?) file.
	 */
	socket.on("spec", function(rpc_struct, callback){
		console.log("spec request to WSkt");
		var struct = dal.db.getJSON();
		callback(struct);
	});

	/**
	 * Handles remote read-write-config requests
	 * This is similar to zygote-embed/remote_controller.js
	 */
	socket.on('data', function(rpc_struct, callback){
		console.log(rpc_struct);
		var ep = rpc_struct['ep'];
		var res = dal.res.getResource(ep);
		
		//Incase there is no such widget....
		if(!res){
			callback({"error" : "non existing widget"});
			return;
		}

		if(rpc_struct['op'] == 'read'){
			res.read(rpc_struct['data'], callback);
		}
		else if(rpc_struct['op'] == 'write'){
			res.write(rpc_struct['data'], callback);
		}
		else if(rpc_struct['op'] == 'config'){
			res.config(rpc_struct['data'], callback);
		}
		else{
			callback({"error":"operation not supported"});
		}
	});

	/**
	 * The flow-create event brings with it flow_set data
	 * flow_set data is { "<flow-id>" : {<flow-details>} }
	 */
	socket.on("flow-create", function(flow_set, callback){
		console.log("flow-create request to WSkt");
		for(flow_id in flow_set){
			exe_unit.create(flow_id, flow_set[flow_id]);
			break; //only one key is expected
		}
		callback({"status" : "ok"});
	});

	/**
	 * The flow-delete event brings with it flow_ids
	 * flow_ids is a list of flow-id's to be deleted 
	 */
	socket.on("flow-delete", function(flow_ids, callback){
		console.log("flow-delete request to WSkt");
		exe_unit.destroy(flow_ids[0]);
		callback({"status" : "ok"});
	});
});

socket.on('disconnect', function(){
	console.log("Disconnected from server");
});

sh.socket = socket;

sh.read = function(rpc_struct, callback){
	console.log("socket handler read called");
	rpc_struct['op'] = 'read';
	//callback is a fn that takes one param --> viz resulting_data
	sh.socket.emit("data", rpc_struct, callback);
}

sh.write = function(rpc_struct, callback){
	console.log("socket handler write called");
	rpc_struct['op'] = 'write';
	//callback is a fn that takes one param --> viz resulting_data
	sh.socket.emit("data", rpc_struct, callback);
}

sh.config = function(rpc_struct, callback){
	console.log("socket handler config called");
	rpc_struct['op'] = 'config';
	//callback is a fn that takes one param --> viz resulting_data
	sh.socket.emit("data", rpc_struct, callback);
}
