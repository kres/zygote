//sample h/w description file

module.exports = 
{
	//name of the board
	"name" : "Beaglebone Black",

	// "/container/bbb"
	"url" : "bbb",

	//all the pins contained by the board
	"pins" : ["p1", "p2", "p3", "p4", "p5", "p6", "p7"],

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
			}
		}, 
		
		"servo" : {
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
		
		}/* ,

		"pwm" : {
			"1" : {
				"pins" : ["p5"]
			},
			
			"2" : {
				"pins" : ["p6"]
			}
		},

		"serial" : {
			"1" : {
				"pins" : ["p6", "p7"]
			}
		}*/
	}
}
