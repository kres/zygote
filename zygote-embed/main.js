//the main js file handles the communication to and from zygote server
//powered by socket-io-client
var conf = require("./conf.js");

//cmd line args  - node main.js <node-type>:<node-name> (eg. bbb:home)
//the node name becomes the part of container url

var arg = process.argv[2] || 'bbb:bbb'; //for now
var rule = /\w+/;

var host = process.argv[3] || "localhost:3000";

var cont_type = arg.split(":")[0];
var url = arg.split(":")[1];
conf.url = url;

//see if the requested url is alpha numeric
if(!(rule.exec(url) != null && rule.exec(url)[0].length == url.length)){
	console.log("Invalid node name; node name should be alphanumeric");
	return;
}

var base_dir = "./lib/"+cont_type+"/";
var spec = require(base_dir+"spec.js"); // "./lib/bbb/spec.js"
conf.spec = spec;

if(spec['res']){
	var res_list = Object.keys(spec['res']); //['gpio', 'serial', 'i2c']

	//populate the res dict with name to module mapping
	for(var i in res_list){
		//conf['gpio'] maps to require('./lib/bbb/gpio')
		conf.res[res_list[i]] = require(base_dir+res_list[i]);
	}
}

if(spec['service']){
	var service_list = Object.keys(spec['service']);
	for(var i in service_list){
		//s = require('./lib/bbb/wifi')
		var s = require(base_dir+service_list[i]);
		//call onload of wifi service
		s.onLoad();
	}
}

//register with the client
var request = require('request-json');
var client = request.createClient('http://'+host+'/');

spec['url'] = url; //override the default url viz 'bbb'
client.post('containers/', spec, function(err, res, data) {
	if(err){
		console.log("Error : ", err);
	}
	else{
		if('error' in data){
			console.log("Error : " + data['error']);
		}
		else{
			console.log("Connected!");
			console.log(data);
			var r_controller = require("./remote_controller.js")
			r_controller.start('http://'+host);
		}
	}
});


