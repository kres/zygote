// This file handles all the resource types
// eg '/bbb/gpio/' and maybe '/bbb/wifi/temp/'
// note all urls end with a '/'
// POSTing to res_type will create a new res of that type
// eg POST /bbb/gpio/ {'ep':1} will create '/bbb/gpio/1' res
// GET will return all active ep's and resp pins


var data = require('./data.js');
var sc = require('./socket_handler.js');

var used_pins = data.used_pins;
		
//req.params[0] => gives path following "bbb/"
//EG : if input url is '/bbb/gpio/'; we have 'gpio'
		
//Returns the all (active) ep for the given resource type
exports.get = function (req, res) {
	var id = req.params[0]; //id is res_type's URL

	//see the container; check if it is active
	var container = req.url.split('/')[1];
	if(! (container in data.res_type)){
		res.status(404).json({"error":"container not active"});
		return;
	}

	var eps = data.res_type[container][id];
	if(eps){
		res.json(eps);
	}
	else{
		res.status(404).json({"error" : "resource type not found"});
	}
};

exports.post = function(req, res) {
	//POST /bbb/gpio/  {'ep' : 'P1'}

	var id = req.params[0]; //id => 'gpio'
	var ep = req.body['ep'];
	if(! ep){
		res.status(404).json({"error" : "unsupported operation"});
		return;
	}

	//see the container; check if it is active
	var container = req.url.split('/')[1];
	if(! (container in data.res_type)){
		res.status(404).json({"error":"container not active"});
		return;
	}

	var ep_set = data.res_type[container][id];

	/*
		ep_set is the json data for the container 
		contains ep => pin mapping
	*/

	if(ep_set && (ep in ep_set)){
		//end point is available
		if(register_pins(used_pins[container], ep_set[ep]).length != 0){
			res.status(404).json({"error" : "pins busy"});
			return;
		}
		
		//register new urls 
		//instance controller 'ic' does the req handling
		var ic = require('./res_instance.js');
		req.app.route(req.url+ep).get(ic.read)
						.post(ic.write)
						.put(ic.config);

		//add ep url to res_inst
		data.res_inst[container][id+'/'+ep] = ep_set[ep];
		
		sc.create(container, id+'/'+ep, {}, function(data){
			res.json(data);
		}); 
	}
	else{
		//check if requested service available
		if(ep_set && ("service" in data.spec[container]['res'][id])){
			//'ep' => the ip addr in case of wifi
			var service = data.spec[container]['res'][id]['service'];
			//XXX main question is, how do I generate ep?
			//sol : data.res_type will have another feild called as count
			//which will maintain the latest count.

			var s_data = ep; //in case of wifi, its IP addr
			ep = parseInt(data.spec[container]['res'][id]['count'])+1;
			ep = ep.toString();
			data.spec[container]['res'][id]['count'] = ep;

			//register new urls 
			//instance controller 'ic' does the req handling
			var ic = require('./res_instance.js');
			req.app.route(req.url+ep).get(ic.read)
							.post(ic.write)
							.put(ic.config);

			//add ep url to res_inst; "/wifi-temp/2  => ip addr"
			data.res_inst[container][id+'/'+ep] = s_data;

			//the client gets opts, eg. {"wifi":"ip-addr"}
			var opts = {}
			opts[service] = s_data;
			sc.create(container, id+'/'+ep, opts, function(data){
				res.json(data);
			}); 
			return;
		}
		res.status(404).json({"error" : "invalid endpoint"});
		return;
	}
};

exports.del = function(req, res){
	var id = req.params[0]; //id is res_type's URL
	var ep = req.body['ep'];
	if(! ep){
		res.status(404).json({"error" : "unsupported operation"});
		return;
	}

	//see the container; check if it is active
	var container = req.url.split('/')[1];
	if(! (container in data.res_type)){
		res.status(404).json({"error":"container not active"});
		return;
	}

	//see if this ep had been activated
	if(! ((id+'/'+ep) in data.res_inst[container]) ){
		res.status(404).json({"error":"res_inst not active"});
		return;
	}

	//if so, free pins and delete it
	var pins = data.res_inst[container][id+'/'+ep]['pins'];
	if(pins){
		for( var i in pins){
			//free ze pins - get index of the pin, remove it
			//NO error checking as pin is supposed to be there
			used_pins[container].splice(used_pins[container].indexOf(pins[i]), 1);
		}
	}
	
	delete data.res_inst[container][id+'/'+ep];
	
	sc.delete(container, id+'/'+ep, {}, function(data){
		res.json(data);
	}); 
};

//takes in list of busy pins and json of res_type
//returns the list of pins not allocated
function register_pins(busy, type){
	if ('pins' in type){
		reqd = type['pins'];
		res = [];
		for(pin in reqd){
			if(busy.indexOf(reqd[pin]) > -1) res.push(reqd[pin]);
		}
		if(res.length == 0){
			for(i in reqd) busy.push(reqd[i]);
		}
		console.log(used_pins);
		return res;
	}
	if('service' in type){

	}
	return [];
}