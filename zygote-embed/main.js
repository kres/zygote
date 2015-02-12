//the main js file handles the communication to and from zygote server
//powered by socket-io-client
var url = process.argv[2] || 'bbb';
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
	console.log('connected to zygote as url : ' + url);
	socket.emit('url',  url);
	socket.on('data', function(data, callback){
		console.log(data);
		//here it should actually 
		callback({"status":"OK"});
	});
	//rpi is the mock client h/w for testing purposes
	if(url == 'rpi'){
		socket.emit('data', 
			{"container" : "bbb", 
			 "res" : "gpio/1",
			 "op": "read",
			 "data" : {"foo":"bar"}
			 }, function(ret_val){
			 	console.log(ret_val);
				});
	}
});
