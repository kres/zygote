//a network attached temp sensor reader
//does nothing much for now, just to test the wifi service

function init(ep, opts, callback){
	this.ep = ep;
	this.ip = opts['wifi'];
	console.log("opts: ", JSON.stringify(opts));
	console.log("Wifi temp created");
	callback(this);
}


init.prototype.read = function read(data, callback){
	console.log("WIFI-temp read");
	console.log("EP : "+this.ep+" IP : "+ this.ip);
	callback({"value" : "ok"});
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
	callback({"value" : "ok"});

}

exports.init = init;
