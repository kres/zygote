//handles listing, adding and deleting of containers
// All path with '/containers/' end here

var data = require('./data.js');
//data. spec, res_type, res_inst

exports.get = function (req, res) {

	//case of querying specific container
	if('container' in req.query){
		var cont = req.query['container'];
		if(cont in data.spec){
			res.json(data.spec[cont]);
		}
		else{
			res.status(404).json({'error': 'container does not exist'})
		}
	}

	//case to just list various connected containers
	else{
		var list = [];
		for(var container in data.spec){
			list.push(container);
		}
		res.json({"containers" : list});
	}
};

exports.post = function(req, res){
	//XXX: assume validated json : req.body (spec file)
	//have to actually add validator here
	var cont = req.body;
	if(cont['url'] in data.spec){
		//error
		res.status(404).json({"error" : "container id exists"});
	}
	else{
		var id = cont['url'];
		data.spec[id] = cont;

		//initialize the res_type structure
		data.res_type[id] = {};
		var sys_res = cont['res'];
		for(var resource in sys_res){
			data.res_type[id][resource] = sys_res[resource];
		}
		//console.log(JSON.stringify(data.res_type));
		//set up new routes
		req.app.get('/'+ cont['url'] +'/*/$', require('./res_type.js').get);
		req.app.post('/'+ cont['url'] +'/*/$', require('./res_type.js').post);

		//send the new url generated
		res.json({"url" : id});
	}
};