//does nothing much for now, just to test the wifi service
var net = require('net');

function init(ep, opts, callback){
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi write created");

	//the wifi temp sensor listens @ port 3003
	var PORT = 8893;
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
	callback({"error" : "Cannot read this resource"});
}

init.prototype.write = function write(data, callback){
	console.log("WIFI-write write");
	this.sock.write(JSON.stringify(data));
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	callback({"value" : "ok"});
}

init.prototype.config = function config(data, callback){
	console.log("WIFI-write config");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	callback({"value" : "ok"});

}

init.prototype.delete = function del(data, callback){
	console.log("WIFI-write delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});

}

exports.init = init;
