//sample h/w description file

var spec = {
	//name of the board
	"name" : "Beaglebone Black",

	// "/container/bbb"
	"url" : "bbb",

	//all the pins contained by the board
	"pins" : ["u0", "u1", "u2", "u3", "P8_13", "P8_19", "P9_14", "P9_16"],

	//system resources
	"res" : {
		"gpio" : {
		//have to add "service" : "GPIO" somewhere.....
		//NO - let system res automaticall get listed
			"ep" : {
				"USR0" : {
					"pins" : ["u0"]
					//other data not relevent now
				},
		
				"USR1" : {
					"pins" : ["u1"]
				},

				"USR2": {
					"pins" : ["u2"]
				},
				
				"USR3" : {
					"pins" : ["u3"]
				},

				"P8_19": {
					"pins" : ["P8_19"]
				},

				"P8_21": {
					"pins" : ["P8_22"]
				},

				"P8_22": {
					"pins" : ["P8_21"]
				}
			}
		}, 
		
		"pwm" : {
			"ep" : {
				"P8_13" : {
					"pins" : ["P8_13"]
				},

				"P8_19" : {
					"pins" : ["P8_19"]
				},

				"P9_14" : {
					"pins" : ["P9_14"]
				},

				"P9_16" : {
					"pins" : ["P9_16"]
				}
			}
		}

	},

	"service" : {
		"wifi" : [] //list of IP addresses available 
				//as per interface specified in "conf.service.wifi"

	}
}

//add plugins -- deep copy
spec.res['servo'] = JSON.parse(JSON.stringify(spec.res.pwm));
spec.res['wifi-temp'] = {"service" : "wifi", "count" : "0"}
spec.res['wifi-bell'] = {"service" : "wifi", "count" : "0", "events" : ['bell']};
spec.res['wifi-dist'] = {"service" : "wifi", "count" : "0", "events" : ['dist']};
spec.res['wifi-rgb']  = {"service" : "wifi", "count" : "0"};
spec.res['wifi-ldr']  = {"service" : "wifi", "count" : "0"};
spec.res['wifi-lm35'] = {"service" : "wifi", "count" : "0"};

module.exports = spec;
