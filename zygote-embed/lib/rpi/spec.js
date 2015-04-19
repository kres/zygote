//sample h/w description file

var spec = 
{
	//name of the board
	"name" : "Raspberry Pi",

	// "/container/bbb"
	"url" : "rpi",

	//all the pins contained by the board
	"pins" : ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],

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
				}
			}
		}
	},

	"service" : {
		"wifi" : [] //list of IP addresses available 
				//as per interface specified in "conf.service.wifi"
	}

}

spec.res['wifi-bell'] = {"service" : "wifi", "count" : "0", "events" : ['bell']};
spec.res['wifi-temp'] = {"service" : "wifi", "count" : "0"};
spec.res['wifi-write'] = {"service" : "wifi", "count" : "0"};
spec.res['wifi-dist'] = {"service" : "wifi", "count" : "0", "events" : ['dist']};
spec.res['wifi-rgb']  = {"service" : "wifi", "count" : "0"};
spec.res['wifi-ldr']  = {"service" : "wifi", "count" : "0"};
spec.res['wifi-lm35'] = {"service" : "wifi", "count" : "0"};

module.exports = spec;
