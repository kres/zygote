//this is a generic representation of a resource that all modules use
//basically contain a set of value such as 'container-name', 'ep-name'
//and a link to the correct controller, viz local or remote controller.
var conf = require('./conf.js');
var lc = require('./local_controller.js');
var rc = require('./remote_controller.js');

function resource(container, ep){
	this.ep = ep; // 'gpio/1' --probably should check if this ep exists!
	this.container = container; //'bbb'
}

resource.prototype.read = function(info, callback){

	if(conf.url == this.container){
		//it is local to this system
		info = info || {};
		lc.read(this.ep, info, callback);
	}
	else{
		//it is foreign res, send via socket
		rc.read({"container":this.container, "ep":this.ep, "data":info}, callback);
	}
}

resource.prototype.write = function(info, callback){

	if(conf.url == this.container){
		//it is local to this system
		info = info || {};
		lc.write(this.ep, info, callback);
	}
	else{
		//it is foreign res, send via socket
		rc.write({"container":this.container, "ep":this.ep, "data":info}, callback);
	}
}

resource.prototype.config = function(info, callback){

	if(conf.url == this.container){
		//it is local to this system
		info = info || {};
		lc.config(this.ep, info, callback);
	}
	else{
		//it is foreign res, send via socket
		rc.config({"container":this.container, "ep":this.ep, "data":info}, callback);
	}
}

module.exports = resource;