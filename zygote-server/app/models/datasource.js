//sample h/w description file

module.exports = 
{
	//name of the board
	'name' : 'Beaglebone Black',

	// '/container/bbb'
	'url' : 'bbb',

	//all the pins contained by the board
	'pins' : ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],

	//system resources
	'res' : {
		'gpio' : {
		//have to add 'service' : 'GPIO' somewhere.....
		//NO - let system res automaticall get listed
			'1' : {
				'pins' : ['p1']
				//other data not relevent now
			},
	
			'2' : {
				'pins' : ['p2']
			},

			'3': {
				'pins' : ['p3']
			},
			
			'4' : {
				'pins' : ['p4']
			}
		},

		'pwm' : {
			'1' : {
				'pins' : ['p5']
			},
			
			'2' : {
				'pins' : ['p6']
			}
		},

		'serial' : {
			'1' : {
				'pins' : ['p6', 'p7']
			}
		}
	}
}
