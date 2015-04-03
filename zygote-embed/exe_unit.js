//this is the execution unit.
//responsible for handling scripts got from flowboard
//hardcode some test scripts 
var Resource = require("./resource.js");
var conf = require("./conf");

exports.execute = function(flow_id, flow_struct){
	//flow struct is the json that holds info about the flow to be executed

	console.log('executing script : ', flow_id);
	console.log(flow_struct);
	console.log("===================");

	//check if flow already exists
	if(flow_id in conf.flows){
		console.log("Flow exists! Deleting first....");
		destroy(flow_id);
		//return;
	}
	var flow_str = flow_struct['flow'];
	
	var flow_func = function(event_data){
		console.log("EXECUTING FLOW");
				eval(flow_str);
			};

	conf.flows[flow_id] = flow_struct;

	//check if trigger is okay
	if(flow_struct.trigger['type'] == 'timer'){
		console.log("TIMER TRIGGER");
		var timer_val = parseInt(flow_struct.trigger['val']);
		
		var func_to_execute = function(){
			flow_func();
			//on delete, use this to clean up
			conf.flows[flow_id]['trigger']['obj'] = setTimeout(func_to_execute, timer_val*1000);
		}
		conf.flows[flow_id]['code'] = func_to_execute;
		func_to_execute();
	}

	else if(flow_struct.trigger['type'] == 'event'){
		console.log("EVENT TRIGGER");
		var url = flow_struct.trigger['val'];
		//on delete, use this to clean up. by removinf listeners.
		conf.flows[flow_id]['trigger']['obj'] = conf.obj_map[url];

		var func_to_execute = function(){
			var emitter = conf.obj_map[url];
			emitter.on(flow_struct.trigger['event'], flow_func);
		}
		conf.flows[flow_id]['code'] = func_to_execute;
		conf.flows[flow_id]['flow'] = flow_func;
		func_to_execute();
		console.log("FLOW event : " + flow_struct.trigger['event']);
	}
	else{
		console.log("Invalid trigger type");
		return;
	}

	//flow_struct['flow'] would be something like
	/*
		var r1 = new Resource('rpi', 'gpio/1');
		r1.config({'mode' : 'input'});
		var r2 = new Resource('bbb', 'gpio/1');
		r2.config({'mode' : 'output'});
		r1.read({}, function(data){
			r2.write(data);
		});
	*/
};

function destroy(flow_id){
	console.log("DELETING flow_id : " + flow_id);

	if (flow_id in conf.flows){
		if(conf.flows[flow_id]['trigger']['type'] == "timer"){
			//timer triggered flow
			clearTimeout(conf.flows[flow_id]['trigger']['obj']);
			delete conf.flows[flow_id];
		}
		else{
			//resource event-emitter triggered flow
			//remove emitter('event-name', listener_func)
			conf.flows[flow_id]['trigger']['obj'].removeListener(
				conf.flows[flow_id]['trigger']['event']
				, conf.flows[flow_id]['flow']
			);
			delete conf.flows[flow_id];
		}
	}
	else{
		console.log("Trying to delete non existing flows")
		return false;
	}
};
exports.destroy = destroy;
