//holds container-url to spec file mapping; sent by client
exports.spec = {};
/*
{
	'bbb' : {
		'url' : 'bbb',
		'name' : 'Beaglebone Black',
		'res' : { 'gpio' : {
							"events" : ["", "", ""] //list of events generated
							"ep" : {
								"1" : {'pins' : ['P9_1']}
							}
						}, 
				  'i2c' : {
				  		..}, 
				  'pwm' : {..}
				}
	},
	'rpi' : {...}
}
*/


//res_type holds map of types to available ep.
exports.res_type = {};
/* 
{
	'bbb' : {
		'gpio' : {'1' : {'pins' : ['P9_1'],
						  'other info' : 'other val'
						  }, 
					'2' : {...}
				 },
				==> the value is basically the 'gpio' object in the spec file
		'servo/pwm' : {...}, 
	},
	'rpi' : {}, ...
}
*/


//holds list of instantiated res_instances
exports.res_inst = {};
/*
{
	'bbb' : {
		'gpio/1' : { 'pins' : ['p1']}, //ok
		'wifi-temp/2' : 'ip-addr'
	}
}
*/

//holds list of pins currently in use
exports.used_pins = {};
/*
{
	'bbb' : [],
	'rpi' : [], etc..
}
*/

//set of all the data that keeps changing....
exports.meta = [exports.res_inst, exports.used_pins];