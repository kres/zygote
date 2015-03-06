//a network attached temp sensor reader
//does nothing much for now, just to test the wifi service

function init(ep, opts, callback){
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi temp created");

	//the wifi temp sensor listens @ port 3003
	var PORT = 3003;

	var client = new net.Socket();
	client.connect(PORT, this.ip, function() {
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		this.sock = client;
	});

	// Add a 'close' event handler for the client socket
	client.on('close', function() {
		console.log('Connection closed');
	});
	callback(this);
}


init.prototype.read = function read(data, callback){
	console.log("WIFI-temp read");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.write("read");
	this.sock.on('data', function(data){
		console.log("data : ", data);
		callback({"value" : data});
	});
}

init.prototype.write = function write(data, callback){
	console.log("WIFI-temp write");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	callback({"value" : "ok"});
}

init.prototype.config = function config(data, callback){
	console.log("WIFI-temp config");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	callback({"value" : "ok"});

}

init.prototype.delete = function del(data, callback){
	console.log("WIFI-temp delete");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	this.sock.destroy();
	callback({"value" : "ok"});

}

exports.init = init;
