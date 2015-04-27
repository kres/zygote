//this is the execution unit which executes the flows 
//uses the resource json data to get triggers etc.

//exe_unit.create
//exe_unit.destroy

//the exe_unit namespace
var exe_unit = {}

exe_unit.create = function(flow_id, flow_struct2){
	var flow_struct = JSON.parse(JSON.stringify(flow_struct2));
	
	console.log('executing script : ', flow_id);
	console.log(flow_struct);
	console.log("===================");

	//check if flow already exists
	if(dal.flows.getFlow(flow_id)){
		console.log("Flow exists! Deleting first....");
		exe_unit.destroy(flow_id);
	}
	var flow_str = flow_struct['flow'];
	
	var flow_func = function(event_data){
		console.log("EXECUTING FLOW");
		eval(flow_str);
	};

	//check if trigger is okay
	if(flow_struct.trigger['type'] == 'timer' || flow_struct.trigger['type'] == 'event'){
		dal.flows.addFlow(flow_id, flow_struct);
	}
	else{
		console.log("Invalid trigger type");
		return;
	}

	if(flow_struct.trigger['type'] == 'timer'){
		console.log("TIMER TRIGGER");
		var timer_val = parseInt(flow_struct.trigger['val']);
		
		var func_to_execute = function(){
			flow_func();
			//on delete, use this to clean up
			dal.flows.getFlow(flow_id)['trigger']['obj'] = setTimeout(func_to_execute, timer_val*1000);
		}
		dal.flows.getFlow(flow_id)['code'] = func_to_execute;
		func_to_execute();
	}

	else if(flow_struct.trigger['type'] == 'event'){
		console.log("EVENT TRIGGER");
		var url = flow_struct.trigger['val'];
		//on delete, use this to clean up. by removing listeners.
		dal.flows.getFlow(flow_id)['trigger']['obj'] = dal.res.getResource(url).obj;

		var func_to_execute = function(){
			var emitter = dal.res.getResource(url).obj;
			emitter.on(flow_struct.trigger['event'], flow_func);
		}
		dal.flows.getFlow(flow_id)['code'] = func_to_execute;
		dal.flows.getFlow(flow_id)['flow'] = flow_func;
		func_to_execute();
		console.log("FLOW event : " + flow_struct.trigger['event']);
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

exe_unit.destroy = function destroy(flow_id){
	console.log("DELETING flow_id : " + flow_id);

	if (dal.flows.getFlow(flow_id)){
		if(dal.flows.getFlow(flow_id)['trigger']['type'] == "timer"){
			//timer triggered flow
			clearTimeout(dal.flows.getFlow(flow_id)['trigger']['obj']);
			dal.flows.deleteFlow(flow_id);
		}
		else{
			//resource event-emitter triggered flow
			//remove emitter('event-name', listener_func)
			dal.flows.getFlow(flow_id)['trigger']['obj'].removeListener(
				dal.flows.getFlow(flow_id)['trigger']['event']
				, dal.flows.getFlow(flow_id)['flow']
			);
			dal.flows.deleteFlow(flow_id);
		}
	}
	else{
		console.log("Trying to delete non existing flows")
		return false;
	}
};
