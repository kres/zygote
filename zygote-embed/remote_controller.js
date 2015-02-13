//handles all outgoing data; meant for resources not onboard
//complements the local_controller.js file
//exposes read-write-config interface.
//handles events it gets from the socket
//will r-w-c from loacl_controller and also create-delete res in it

exports.start = function start(server){
	var socket = require('socket.io-client')(server);
	socket.on('connect', function(){
		console.log('connected to zygote as url : ' + url);
		socket.emit('url',  url);

		socket.on('data', function(data, callback){
			console.log(data);
			//here it should actually do the processing
			//read-write-config an onboard resource
			callback({"status":"OK"});
		});

		socket.on('create', function(data, callback){
			//create a resource
		});

		socket.on('delete', function(data, callback){
			//remove a resource
		});

	});
}
