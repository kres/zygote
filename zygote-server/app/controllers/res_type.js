// All requests to '/container/*' is routed here.
// Includes GET, POST, PUT, DEL. forwards to the correct model.

var data = require('./data.js');

var used_pins = [];
		
//req.params[0] => gives path following "bbb/"
//EG : if input url is '/bbb/gpio/'; we have 'gpio'
		
//Returns the number of free/available ep for the given resource type
exports.get = function (req, res) {
	var id = req.params[0]; //id is res_type's URL
	var container = req.url.split('/')[1];
	console.log('READ : '+id+' : '+ req.url);

	var available_ep = data.res_type[container][id];
	if(available_ep){
		res.json(available_ep);
	}
	else{
		res.status(404).json({"error" : "resource type not found"});
	}
};

exports.post = function(req, res) {
	var id = req.params[0]; //id is res_type's URL
	var ep = req.body['ep'];
	if(! ep){
		res.status(404).json({"error" : "unsupported operation"});
	}
	var container = req.url.split('/')[1];
	var ep_set = data.res_type[container][id];

	if(ep_set && (ep in ep_set)){
		//end point is available
		if(register_pins(used_pins, ep_set[ep]).length != 0){
			res.status(404).json({"error" : "pins busy"});
			return;
		}
		req.app.all(req.url+ep, require('./res_instance.js'));
		res.json({"url":req.url+ep})
	}
	else{
		res.status(404).json({"error" : "invalid endpoint"});
	}
};

exports.del = function(req, res){
	var id = req.params[0]; //id is res_type's URL
	var data = req.body;
	var ep = data['ep'];
	console.log('DELETE : '+id+' : '+ JSON.stringify(data));
	//XXX : resource delete is a headache for now :(
	res.send("<h1>OKAY</h1>");
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
}