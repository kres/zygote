//does nothing much for now, just to test the wifi service
var net = require('net');
var events = require('events');

function init(ep, opts, callback){
	events.EventEmitter.call(this);
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi bell created");

	//the wifi temp sensor listens @ port 3003
	var PORT = 8892;
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
			console.log("Bell ringed : ", data.toString());
			myObj.emit("bell"); //should I emit any data?
		});
		/* This was just for debug purpose
			myObj.on("bell", function(){
				console.log("bell event emited and recieved");
			});
		*/
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
		console.log('Wifi-Bell Connection closed');
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
	console.log("WIFI-bell delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});

}

exports.init = init;
