// All requests to '/container/*' is routed here.
// Includes GET, POST, PUT, DEL. forwards to the correct model.

var ds = require('./datasource.js');

//merge resources into main object 
//XXX : ignore 'bbb' for now; assume only 1 h/w
// It will take minimal effort to change anyway

if('res' in ds){
	var extend = require('util')._extend;
	extend(ds, ds['res']);
	delete ds['res'];
}

function get_data(url){
	
	dir = url.split('/');
	console.log("URL : "+ url);
	var data = undefined;

	for(var i in dir){
		data = ds[dir[i]];
		if(data == undefined) break;
	}

	return data;
}

		
//req.params[0] => gives path following "container/"
//EG : if input url is '/container/bbb/gpio/'; we pass 'bbb/gpio'
		
exports.get = function (req, res) {
	var id = req.params[0]; //id is res_type's URL
	var data = req.query;
	console.log('READ : '+id+' : '+ JSON.stringify(data));
	res.send(JSON.stringify(get_data(id)));
	//XXX later instead of res.send; `model.read(id, data, callback_fn);`
};


exports.put = function (req, res) {
	var id = req.params[0]; //id is res_type's URL
	var data = req.body;
	console.log('CONFIG : '+id+' : '+ JSON.stringify(data));

	//if client is creating a new end point
	if('ep' in data){

		//get ep trying to be created
		var ep = data['ep'];

		//get sets of ep for res_type 
		var ep_set = get_data(id);
			
		//does res_type exist? if so, does reqd 'ep' exist?
		if (ep_set && (ep in ep_set)) {
			//create an endpoint; link it to res_instance.js controller
			//eg: id='gpio', ep='1'; url created => '/container/gpio/1'
			ep_url = "/"+id+"/"+ep;
			req.app.all('/container'+ ep_url, require('./res_instance.js'));
			res.send({"ep": ep_url});
		}

		else{
			//somethin wong!
			res.status(404).send("Invalid endpoint");
		}
	}
		
	else{
		//not handling anything else now
		res.status(404).send("Operation not supported");
	}
};

exports.post = function(req, res) {
	var id = req.params[0]; //id is res_type's URL
	var data = req.body;
	console.log('WRITE : '+id+' : '+ JSON.stringify(data));
	res.send("<h1>OKAY</h1>");
};

exports.del = function(req, res){
	var id = req.params[0]; //id is res_type's URL
	var data = req.body;
	var ep = data['ep'];
	console.log('DELETE : '+id+' : '+ JSON.stringify(data));
	//XXX : resource delete is a headache for now :(
	res.send("<h1>OKAY</h1>");
};

