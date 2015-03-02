//This is the conf file, responsible for holding board specific runtime variables

exports.url = "";

exports.res = {};
//res.gpio = require(base_dir/gpio.js)
	// gpio, pwm is automatically enumerated by parsing the spec file --by main.js
	// h-w is the url in context

exports.spec = {}; //corresponds to the spec file of the board it belongs to


exports.service = {};

//add the wifi service info; the wifi module will read this internally
exports.service['wifi'] = { "interface" : "usb0"
				, "ip"	: "10.0.0.1-20"
			};
