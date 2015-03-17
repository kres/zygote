//this is the execution unit.
//responsible for handling scripts got from flowboard
//hardcode some test scripts 
var Resource = require("./resource.js");
var conf = require("./conf");

exports.execute = function(flow_id, flow_struct){
	//flow struct is the json that holds info about the flow to be executed

	console.log('executing script : ', flow_id);
	console.log(flow_struct);

	//check if flow already exists
	if(flow_id in conf.flows){
		console.log("Flow exists! Delete first. Aborting...");
		return;
	}

	//check if trigger is okay
	if(flow_struct.trigger['type'] == 'timer'){
		var timer_val = parseInt(flow_struct.trigger['val']);

		var flow_func = eval(flow_struct['flow']);
		
		conf.flows[flow_id] = flow_struct;
		
		var func_to_execute = function(){
			//if the flow exists, schedule again
			//flow_id won't exist if it has been deleted
			flow_func();
			conf.flows[flow_id]['trigger']['obj'] = setTimeout(flow_func, timer_val*1000);
		}
		conf.flows[flow_id]['code'] = func_to_execute;
		func_to_execute();
	}

	else if(flow_struct.trigger['type'] == 'event'){
		//TODO : implement event based triggers
	}
	else{
		console.log("Invalid trigger type");
		return;
	}
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