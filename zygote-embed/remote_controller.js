//handles all outgoing data; meant for resources not onboard
//complements the local_controller.js file
//exposes read-write-config interface.
//handles events it gets from the socket
//will r-w-c from loacl_controller and also create-delete res in it

var conf = require("./conf.js");
var lc = require("./local_controller");
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