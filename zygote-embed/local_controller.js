//holds generic-resource to actual object mapping of all local resources
//exposes read-write-config for operating on resources

//has a create and delete function to add new and remove existing resources

var obj_map = {
	//url to obj mapping
	// 'gpio/P9_11' ---> conf['gpio']('P9_11'); where conf['gpio'] is require('./base_dir/gpio.js')
};