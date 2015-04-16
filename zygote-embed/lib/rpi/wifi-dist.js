//does nothing much for now, just to test the wifi service
var net = require('net');
var events = require('events');

function init(ep, opts, callback){
	events.EventEmitter.call(this);
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi dist created");

	var PORT = 8891;
	var HOST = this.ip;
	var client = new net.Socket();
	var myObj = this;
	client.connect(PORT, HOST, function(err) {
		if(err){
			console.log("ERROR in connecting : "+ err);
			return;
		}
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		myObj.sock = client;

		//add emitter here?
		myObj.sock.on('data', function(data){
			console.log("Wifi dist : ", data.toString());
			myObj.emit("dist", {value : data.toString()});
		});
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
		console.log('Wifi dist Connection closed');
	});
	callback(this);
}

init.prototype.__proto__ = events.EventEmitter.prototype;


init.prototype.read = function read(data, callback){
	callback({"error" : "Cannot read this resource"});
}

init.prototype.write = function write(data, callback){
	callback({"error" : "Cannot write this resource"});
}

init.prototype.config = function config(data, callback){
	callback({"error" : "Cannot configure this resource"});
}

init.prototype.delete = function del(data, callback){
	console.log("WIFI dist delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});
}

exports.init = init;
