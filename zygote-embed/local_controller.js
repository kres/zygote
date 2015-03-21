//holds generic-resource to actual object mapping of all local resources
//exposes read-write-config for operating on resources

//has a create and delete function to add new and remove existing resources

var conf = require("./conf.js");

var obj_map = {
	//url to obj mapping
	// 'gpio/P9_11' ---> conf.res['gpio']('P9_11'); where conf['gpio'] is require('./base_dir/gpio.js')
};
conf.obj_map = obj_map;

/*
	res : string - 'gpio/1'
	info : json value of options 
	callback : fn which takes one argument, viz ret val data
*/
exports.read = function(res, info, callback){
	//info could have no. of bytes to read,
		//ofset to start from, etc.
	if(res in obj_map){
			var real_obj = obj_map[res];
			real_obj.read(info, callback);
	}
	else{
		callback({"error":"no such resource"});
	}
};

exports.write = function(res, info, callback){
	//info here will contain data to be written
	if(res in obj_map){
			var real_obj = obj_map[res];
			real_obj.write(info, callback);
	}
	else{
		callback({"error":"no such resource"});
	}
};

exports.config = function(res, info, callback){
	//info contains config params
	if(res in obj_map){
			var real_obj = obj_map[res];
			real_obj.config(info, callback);
	}
	else{
		callback({"error":"no such resource"});
	}
};

exports.create = function(res, opts, callback){
	//res => gpio/1
	if(res in obj_map){
		callback({"error":"resource already exists"});
	}

	else{
		var type = res.split('/')[0]; //'gpio'
		var ep = res.split('/')[1]; // '1'
		if(type in conf.res){
			//init returns the actual h/w object
			//h/w object has a R-W-C interface along with delete 'destructor'
			new conf.res[type].init(ep, opts, function(obj){
				console.log("Adding to obj_map " + res);
				obj_map[res] = obj;
				callback({"ep" : res});
			});
		}
		else{
			callback({"error": "Non existant resource type"})
		}
	}
};

exports.delete = function(res, opts, callback){
	//res => gpio/1
	if(res in obj_map){
		obj_map[res].delete(opts, function(){
			delete obj_map[res];
			callback({"ep":res});
		});
	}

	else{
		callback({"error":"resource does not exist"});
	}
};
