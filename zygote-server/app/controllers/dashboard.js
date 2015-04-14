//The controller for the zygote-dashboard running on the browser
//It has it's own socket and has an interface similar to that of socket_handler.js
//This file should be later merged with socket_handler, but
//There could be subtle differences that could lead to a problem. So seprate for now

var sc = require('./socket_handler.js');

exports.read = function (req, res){
	//url : /dashboard/panel-1/widget-1
	var url = req.url;
	//['', dashboard, panel-1, widget-1]
	var container = url.split('/')[1];
	// [prev list] => [panel-1, widget-1] => 'p1/w1'
	var id = url.split('/').slice(2).join('/');

	sc.read(container, id, req.query, function(data){
		res.json(data);
	});
};

exports.write = function (req, res){
	var url = req.url;

	var container = url.split('/')[1];
	var id = url.split('/').slice(2).join('/');

	sc.write(container, id, req.body, function(data){
		res.json(data);
	});
};

exports.config = function (req, res){
	var url = req.url;

	var container = url.split('/')[1];
	var id = url.split('/').slice(2).join('/');

	sc.config(container, id, req.body, function(data){
		res.json(data);
	});
};

//hold all the events specific to the widget type
//used by the dashboard
var event_map = {
	"colorPicker" : ["color-change"],
	"toggleButton" : ["toggle"]
};

exports.events = function(req, res){
	res.json(event_map);
};
