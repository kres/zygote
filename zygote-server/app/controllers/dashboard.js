//The controller for the zygote-dashboard running on the browser
//It has it's own socket and has an interface similar to that of socket_handler.js
//This file should be later merged with socket_handler, but
//There could be subtle differences that could lead to a problem. So seprate for now

function read (panel, widget, args, callback) {

	if((panel in dashboard_tree) and (widget in dashboard_tree[panel])){
		var obj = {"panel" : panel, "widget":widget, "data" : args};
		ds.emit("read", obj, function(ret_val){
				callback(ret_val);
			});
	}
	else{
		callback({"error" : "non existing panel/widget"});
	}
}

function write (panel, widget, args, callback) {

	if((panel in dashboard_tree) and (widget in dashboard_tree[panel])){
		var obj = {"panel" : panel, "widget":widget, "data" : args};
		ds.emit("write", obj, function(ret_val){
				callback(ret_val);
			});
	}
	else{
		callback({"error" : "non existing panel/widget"});
	}
}

// Don't know if config should be allowed!
// all should be done from the user side.....
function config (panel, widget, args, callback) {

	if((panel in dashboard_tree) and (widget in dashboard_tree[panel])){
		var obj = {"panel" : panel, "widget":widget, "data" : args};
		ds.emit("config", obj, function(ret_val){
				callback(ret_val);
			});
	}
	else{
		callback({"error" : "non existing panel/widget"});
	}
}

exports.read = read;
exports.write = write;
exports.config = config;

/******************************************************************/

//The following two functions are the result of user creating/deleting widgets on dashboard

function create (panel, widget, args) {
	// manipulate the dashboard_tree
	if(!panel || !widget){
		return {"error" : "data in wrong format"};
	}

	if(panel in dashboard_tree){
		dashboard_tree[panel][widget] = args;
		return {"status" : "ok"};
	}else{
		return {"error" : "panel does not exist"};
	}
}

function del (panel, widget) {
	// manipulate the dashboard_tree
	if(!panel || !widget){
		return {"error" : "data in wrong format"};
	}

	if(panel in dashboard_tree and widget in dashboard_tree[panel]){
		delete dashboard_tree[panel][widget];
		return {"status" : "ok"};
	}else{
		return {"error" : "panel/widget does not exist"};
	}
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

/*
	Return the list of panels present in the dashboard
	["p1", "p2", "p3", ...]
*/
function get_panels(){
	return Object.keys(dashboard_tree);
}

/*
	Returns the json obj of widgets (& its info)

	{
		"w-id" : {widget info},
		"w-id" : {widget info},
		...
	}
*/
function get_widgets (panel_id) {
	if(panel_id in dashboard_tree){
		return dashboard_tree[panel_id];
	}
	return {"error" : "panel not found"}
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
			var res = create(data['panel'], data['widget'], data['widget-info']);
			callback(res);
		});

		socket.on("delete", function(data, callback){
			var res = del(data['panel'], data['widget']);
			callback(res);
		});
	});
}