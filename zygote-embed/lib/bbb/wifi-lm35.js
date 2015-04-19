//a network attached temperature sensor reader
//works with wifi-lm35.py

var net = require('net');

function init(ep, opts, callback){
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi lm35 created");

	var PORT = 8896;
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
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
		console.log('Connection closed');
	});
	callback(this);
}


init.prototype.read = function read(data, callback){
	console.log("WIFI-lm35 read");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.once('data', function(data){
		console.log("data : ", data);
		callback({"value" : data.toString()});
	});
	this.sock.write("read");
}

init.prototype.write = function write(data, callback){
	console.log("WIFI-lm35 write");
	callback({"error" : "Cannot write to this resource"});
}

init.prototype.config = function config(data, callback){
	console.log("WIFI-lm35 config");
	callback({"error" : "Cannot configure this resource"});

}

init.prototype.delete = function del(data, callback){
	console.log("WIFI-lm35 delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});

}

exports.init = init;
