//handles the incoming socket connections properly
//does routing work too
var data = require('./data.js');

//contains container name to socket object mapping
var sock_map = {};
exports.sock_map = sock_map;

exports.startSocket = function(server){
	//create the web-socket manager
	var io = require('socket.io')(server);

	io.on('connection', function(socket){

		socket.on('url', function(msg){
			//msg is json, such as : {'url' : bbb'}
			//if the board is available, or dashboard connects automatically
			if(msg['url'] in data.spec || msg['url'] == "dashboard"){
				//add a mapping 
				sock_map[msg['url']] = socket;
				
				//add data handler
				socket.on('data', function(req, callback){
					//req contains the request data
					//req : {'container' : 'bbb', 'ep' : 'gpio/1', 'op' : 'read',data : {}}
					if(req['container'] in sock_map){
						sock_map[req['container']].emit('data', req, function(ret_val){
							callback(ret_val);
						});
					}
					else{
						callback({"error": "no such container"});
					}
				});

				//add disconnect handler 
				socket.on('disconnect', function(){
					delete sock_map[msg['url']];
					delete data.spec[msg['url']];
					delete data.res_type[msg['url']];
					delete data.res_inst[msg['url']];
					delete data.used_pins[msg['url']];
					console.log(msg['url'] + " - connection terminated");
				});
				console.log(msg['url'] + " - connected");
			}
			else{
				socket.disconnect();
			}
		});
	});
}

exports.read = function(container, ep, data, callback){
	console.log("call to read");
	if(container in sock_map){
		var s = sock_map[container];
		var rpc_struct = {};
		rpc_struct['data'] = data;
		rpc_struct['op'] = 'read';
		rpc_struct['ep'] = ep;
		rpc_struct['container'] = container; //reqd. ?
		s.emit("data", rpc_struct, function(ret_val){
			callback(ret_val);
		});
	}
	else{
		callback({"error":"no such container"});
	}
};

exports.write = function(container, ep, data, callback){
	console.log("call to write");
	if(container in sock_map){
		var s = sock_map[container];
		var rpc_struct = {};
		rpc_struct['data'] = data;
		rpc_struct['op'] = 'write';
		rpc_struct['ep'] = ep;
		rpc_struct['container'] = container; //reqd. ?
		s.emit("data", rpc_struct, function(ret_val){
			callback(ret_val);
		});
	}
	else{
		callback({"error":"no such container"});
	}
};

exports.config = function(container, ep, data, callback){
	console.log("call to config");
	if(container in sock_map){
		var s = sock_map[container];
		var rpc_struct = {};
		rpc_struct['data'] = data;
		rpc_struct['op'] = 'config';
		rpc_struct['ep'] = ep;
		rpc_struct['container'] = container; //reqd. ?
		s.emit("data", rpc_struct, function(ret_val){
			callback(ret_val);
		});
	}
	else{
		callback({"error":"no such container"});
	}
};


/*
	create delete resources in the remote containers
*/

exports.create = function(container, ep, data, callback){
	console.log("call to create");
	if(container in sock_map){
		var s = sock_map[container];
		var rpc_struct = {};
		rpc_struct['data'] = data;
		rpc_struct['ep'] = ep;
		rpc_struct['container'] = container; //reqd. ?
		s.emit("create", rpc_struct, function(ret_val){
			callback(ret_val);
		});
	}
	else{
		callback({"error":"no such container"});
	}
};

exports.delete = function(container, ep, data, callback){
	console.log("call to delete");
	if(container in sock_map){
		var s = sock_map[container];
		var rpc_struct = {};
		rpc_struct['data'] = data;
		rpc_struct['ep'] = ep;
		rpc_struct['container'] = container; //reqd. ?
		s.emit("delete", rpc_struct, function(ret_val){
			callback(ret_val);
		});
	}
	else{
		callback({"error":"no such container"});
	}
};

exports.execute = function(container, flow_struct, callback){
	//send script event via socket
	var s = sock_map[container];
	console.log("Sending flow to " + container);
	s.emit("flow-create", flow_struct, function(ret_val){
		callback(ret_val);
	});
};

exports.delete_flow = function(container, flow_id, callback){
	//send script event via socket
	var s = sock_map[container];

	s.emit("flow-delete", [flow_id], function(ret_val){
		callback(ret_val);
	});
};

exports.refresh = function(container, callback){
	var s = sock_map[container];
	s.emit("spec", {}, function(ret_val){
		callback(ret_val);
	});
};
