//WiFi RGB led node adapter
//write to rgb led
var net = require('net');

function init(ep, opts, callback){
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi RGB created");

	var PORT = 8894;
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
		console.log('Wifi rgb Connection closed');
	});
	callback(this);
}

init.prototype.read = function read(data, callback){
	callback({"error" : "Cannot read this resource"});
}

init.prototype.write = function write(data, callback){
	console.log("WIFI-rgb write");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	var d = data["value"]["r"] + ":"
			+ data["value"]["g"] + ":"
			+ data["value"]["b"];
	this.sock.write(d);
	callback({"value" : "ok"})
}

init.prototype.config = function config(data, callback){
	callback({"error" : "Cannot configure this resource"});
}

init.prototype.delete = function del(data, callback){
	console.log("WIFI rgb delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});
}

exports.init = init;
