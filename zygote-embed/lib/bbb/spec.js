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
		}, 
		
		"pwm" : {
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
}

//add plugins -- deep copy
spec.res['servo'] = JSON.parse(JSON.stringify(spec.res.pwm));


module.exports = spec;

