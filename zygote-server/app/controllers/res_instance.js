// This controller handles the incoming request of active resource instances
// eg. "/bbb/gpio/1"
// When model handling resurce type

var data = require('./data.js');
var sc = require("./socket_handler.js");

exports.read = function (req, res){
	//url : /bbb/gpio/1
	var url = req.url;
	//['', bbb, gpio, 1]
	var container = url.split('/')[1];
	// [prev list] => [gpio, 1] => 'gpio/1'
	var id = url.split('/').slice(2).join('/');

	if(id in data.res_inst[container]){
		console.log("READ : "+ req.url);
		//here it will route to sockets controller
		sc.read(container, id, req.query, function(data){
			res.json(data);
		});
	}
	else{
		res.status(404).json({"error": "non existing instance"});
	}
};

exports.write = function (req, res){
	var url = req.url;
	console.log("URL : "+ url);
	var container = url.split('/')[1];

	if(!(container in data.res_inst)){
		res.status(404).json({"error": "non existing container"});
		return;
	}

	var id = url.split('/').slice(2).join('/');
	console.log("ID : "+ id);
	if(id in data.res_inst[container]){
		console.log("WRITE : "+ req.url);
		//here it will route to sockets controller
		sc.write(container, id, req.body, function(data){
			res.json(data);
		});
	}
	else{
		res.status(404).json({"error": "non existing instance"});
	}
};

exports.config = function (req, res){
	var url = req.url;
	var container = url.split('/')[1];
	var id = url.split('/').slice(2).join('/');

	if(id in data.res_inst[container]){
		console.log("CONFIG : "+ req.url);
		//here it will route to sockets controller
		sc.config(container, id, req.body, function(data){
			res.json(data);
		});
	}
	else{
		res.status(404).json({"error": "non existing instance"});
	}
};
