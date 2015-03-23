//The controller for the zygote-dashboard running on the browser
//It has it's own socket and has an interface similar to that of socket_handler.js
//This file should be later merged with socket_handler, but
//There could be subtle differences that could lead to a problem. So seprate for now

function read (panel, widget, args, callback) {
	// body...
}

function write (panel, widget, args, callback) {
	// body...
}

function config (panel, widget, args, callback) {
	// body...
}


//The following two functions are the result of user creating/deleting widgets on dashboard

function create (panel, widget, args, callback) {
	// body...
}

function delete (panel, widget, args, callback) {
	// body...
}



// following structure is updated by create and delete
// For internal use only
// Should expose functions to get the reqd values to display in flowboard

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
