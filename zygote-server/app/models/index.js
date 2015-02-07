//Handles interaction with resource types

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

	for(i in dir){
		data = ds[dir[i]];
		if(data == undefined) break;
	}

	return data;
}

/*
 * id => the REST url component - the resource to manipulate 
 * data => the json data associated with the request
 * callback => function to call when operation is done
*/

exports.read = function (id, data, callback){
		console.log('READ : '+id+' : '+ JSON.stringify(data));
		callback(JSON.stringify(get_data(id)));
	};


exports.write = function (id, data, callback){
		console.log('WRITE : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};

//XXX: any change in structure of desc file will break the code
exports.update = function (id, data, callback){
		console.log('CONFIG : '+id+' : '+ JSON.stringify(data));

		//if client is creating a new endoint
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
				callback({"ep": ep_url}, {"ep" : ep_url});
			}

			else{
				//somethin wong!
				callback(undefined);
			}
		}
		else{
			//not handling anything else now
			callback(undefined);
		}
	};


exports.del = function (id, data, callback){
		console.log('DELETE : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};
