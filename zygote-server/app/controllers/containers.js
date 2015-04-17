//handles listing, adding and deleting of containers
// All path with '/containers/' end here
var sc = require('./socket_handler.js');
var data = require('./data.js');
//data. spec, res_type, res_inst

exports.get = function (req, res) {

	//case of querying specific container
	if('container' in req.query){
		var cont = req.query['container'];
		if(cont in data.spec || cont == "dashboard"){
			if('refresh' in req.query){
				sc.refresh(cont, function(spec){
					if(cont != "dashboard"){
						data.spec[cont] = spec;
					}
					res.json(spec);
				});
			}
			else{
				res.json(data.spec[cont]);
			}
		}
		else{
			res.status(404).json({'error': 'container does not exist'})
		}
	}

	//case to just list various connected containers
	else{
		var list = [];
		if (sc.sock_map["dashboard"]){
			list.push("dashboard");
		}
		for(var container in data.spec){
			console.log(Object.keys(data.spec));
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
	else if(cont['url'] == 'dashboard'){
		res.status(404).json({"error" : "Dashboard is a reserved keyword"});
	}
	else{
		var id = cont['url'];
		data.spec[id] = cont;

		//initialize the res_type structure
		data.res_type[id] = {};
		var sys_res = cont['res'];
		for(var resource in sys_res){
			//should take care of services
			if("ep" in sys_res[resource]){
				data.res_type[id][resource] = sys_res[resource]["ep"];
			}
			else{
				data.res_type[id][resource] = sys_res[resource];			
			}
		}
		//add the cont url to active inst dict
		data.res_inst[id] = {};

		//initalize used pins list for this board
		data.used_pins[id] = [];

		//set up new routes
		req.app.get('/'+ cont['url'] +'/*/$', require('./res_type.js').get);
		req.app.post('/'+ cont['url'] +'/*/$', require('./res_type.js').post);
		req.app.delete('/'+ cont['url'] +'/*/$', require('./res_type.js').del);

		//send the new url generated
		res.json({"url" : id});
	}
};