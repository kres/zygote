//the main js file handles the communication to and from zygote server
//powered by socket-io-client
var conf = require("./conf.js");

var url = process.argv[2] || 'bbb'; //for now
conf.url = url;

var base_dir = "./lib/"+url+"/";
var spec = require(base_dir+"spec.js"); // "./lib/bbb/spec.js"
var res_list = Object.keys(spec['res']); //['gpio', 'serial', 'i2c']

//populate the res dict with name to module mapping
for(var i in res_list){
	//conf['gpio'] maps to require('./lib/bbb/gpio')
	conf.res[res_list[i]] = require(base_dir+res_list[i]);
}

//register with the client
var request = require('request-json');
var client = request.createClient('http://localhost:3000/');
 
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
			r_controller.start('http://localhost:3000');
		}
	}
});


