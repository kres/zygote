//holds generic-resource to actual object mapping of all local resources
//exposes read-write-config for operating on resources

//has a create and delete function to add new and remove existing resources

var obj_map = {
	//url to obj mapping
	// 'gpio/P9_11' ---> conf['gpio']('P9_11'); where conf['gpio'] is require('./base_dir/gpio.js')
};

/*
	res : string - 'gpio/1'
	info : json value of options 
	callback : fn which takes one argument, viz ret val data
*/
exports.read = function(res, info, callback){
	if(res in obj_map){
			var real_obj = obj_map['res'];
			real_obj.read(info, callback);
	}
	else{
		callback({"error":"no such resource"});
	}
};