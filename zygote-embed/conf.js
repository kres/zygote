//This is the conf file, responsible for holding board specific runtime variables

exports.url = "";

exports.res = {};
//res.gpio = require(base_dir/gpio.js)
	// gpio, pwm is automatically enumerated by parsing the spec file --by main.js
	// h-w is the url in context

exports.spec = {}; //corresponds to the spec file of the board it belongs to


exports.service = {};

//add the wifi service info; the wifi module will read this internally
exports.service['wifi'] = { "interface" : "eth1"
				, "ip"	: "10.0.0.1-20"
			};

//data about current running flows
exports.flows = {}
/*
//flows has map of flow id to the following struct

	flow-id : {
			"flow" : "<code-string>",
			"target" : "<container-name>",
			"trigger" : {
				"type"  : "['timer'|'event']",
				"val" : "['number'|'url']", //number=> time in sec, url=>'gpio/1'
				"obj"	:  [<timer-obj> | <event-emmiter-obj>]
				"event" : "name-of-event" //only for event emitter types
			},
			"code" : <function-obj> //generated code, includes trigger
	}
	//on flow delete
*/

exports.obj_map = {}
//'gpio/P1' => new conf['res']['gpio']('P1');