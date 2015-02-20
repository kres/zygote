//this will have gpio related functions
//init() => will return the object
//object will have `read`, `write` and `config` methods.

//useage => local_map['url'] = new require('./path/gpio.js')('end-point');

/*
CODE STRUCTURE
-----------------------
*/
var b = require('bonescript');

function init(ep, opts, callback){
	//I could have a rest url to internal identifier map if reqd.
	this.ep = ep;
	console.log("New GPIO end point created");
	//shuld I have a url mapping defined here; just for back linking
	if('mode' in opts){
		this.mode = mode;
	}
	else{
		this.mode = 'out';
	}
	callback(this); //if there is an error, do what?
}


init.prototype.read = function read(data, callback){ 
	console.log("GPIO Read : ", data);
	callback({"value":"random-data"});
};

init.prototype.write = function write(data, callback){ 
	console.log("GPIO write : ", data);
	var out = parseInt(data['value']);
	b.digitalWrite(this.ep, out, function(x){
		if(x.err){
			callback({"error" : x.err});
		}
		else{
			callback({"value": data['value']});
		}
	});
};

init.prototype.config = function config(data, callback){ 
	console.log("GPIO config : ", data);
	callback({"value":"something configured"});
};

init.prototype.delete = function del(data, callback) {
	console.log("GPIO delete : ", data);
	callback({"value":"cleanup done"});
};

exports.init = init;