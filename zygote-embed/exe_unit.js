//this is the execution unit.
//responsible for handling scripts got from flowboard
//hardcode some test scripts 
var Resource = require("./resource.js");

exports.execute = function(script){
	console.log('executing script : ');
	console.log(script);
	
	//blindly evaluate the script for now
	eval(script);

	//script would be something like
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