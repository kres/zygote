//this is the execution unit.
//responsible for handling scripts got from flowboard
//hardcode some test scripts 
var Resource = require("./resource.js");
var conf = require("./conf");
conf.flows = {}

exports.execute = function(flow_id, flow_struct){
	//flow struct is the json that holds info 
	//about the flow to be executed

	console.log('executing script : ', flow_id);
	console.log(flow_struct);
	
	//blindly evaluate the script for now
	eval(flow_struct['flow']);

	//flow_struct['flow'] would be something like
	/*
	function foobar(){
		var r1 = new Resource('rpi', 'gpio/1');
		r1.config({'mode' : 'input'});
		var r2 = new Resource('bbb', 'gpio/1');
		r2.config({'mode' : 'output'});
		r1.read({}, function(data){
			r2.write(data);
		});
		setTimeout(1000, foobar);
	}
	*/
}