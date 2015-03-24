//The controller for the zygote-dashboard running on the browser
//It has it's own socket and has an interface similar to that of socket_handler.js
//This file should be later merged with socket_handler, but
//There could be subtle differences that could lead to a problem. So seprate for now

function read (panel, widget, args, callback) {
	// uses socket 'ds'
}

function write (panel, widget, args, callback) {
	// uses socket 'ds'
}

function config (panel, widget, args, callback) {
	// uses socket 'ds'
}

exports.read = read;
exports.write = write;
exports.config = config;

/******************************************************************/

//The following two functions are the result of user creating/deleting widgets on dashboard

function create (panel, widget, args) {
	// manipulate the dashboard_tree
}

function del (panel, widget) {
	// manipulate the dashboard_tree
}

// following structure is updated by create and delete
// For internal use only
// Should expose functions to get the reqd values to display in flowboard
		//function get_panels()
		//function get_widgets("panel-id");

var dashboard_tree = {}
/*
{
	"panel-id" : {
		"widget-id" : {
			"type" : "heater"
			"other setting" : "setting value"
			...
		},

		"widget-id" : {
			...
		}
	},

	"panel-id" : {
		....
	}
	...
}
*/

function get_panels(){
	return panels;
}

function get_widgets (panel_id) {
	return widgets;
}

exports.get_panels = get_panels;
exports.get_widgets = get_widgets;

/*****************************************************************************/

//The main socket handler
var ds;
exports.startSocket = function(server){
	//create the web-socket manager
	var io = require('socket.io')(server);
	var dsr = io.of('/dashboard');

	dsr.on("connection", function(socket){
		console.log("Connected to dashboard!!");
		ds = socket;
		socket.on("create", function(data, callback){
			create(data['panel'], data['widget'], data['widget-info']);
		});

		socket.on("delete", function(data, callback){
			del(data['panel'], data['widget']);
		});
	});
}