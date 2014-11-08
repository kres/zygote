# This contains the config information of the BBB. 
# this is used by the flask app to extract info
# the config dict contains, board information, features, io module description.
# each io module (gpio,pwm,i2c,servo etc) is defined by a dictionary
# the key is what appears in the REST url, value is the internal mapping, 
# which could be a string-constant or object, and it is what the wrapper function gets as param
#eg. /foo/bar, where foo is a io module,
# 	foo : {
#		'bar' : bar_obj
#	}
#	foo_handler(bar_obj)

#	now if we have foo/bar/doo; foo is the resource
#	then 
#	foo : {
#		bar : {
#			'doo' : doo_obj
#		}
#	}
#
# and the corresponding mapping function will be :  func(doo_obj, other_info)

# The REST-name to internal-name mapping is very useful as say I want to change GPIO url
# from GET /gpio/GPIO1_22  => GET /gpio/P8_14 ; then we need to only change the entry in the dictionary
# It makes things very portable and easy to use. 

import bbio
import Servo

###################
#config dictionary#
###################

board_config = {
	
	'name' : 'Beaglebone Black',

	#if a feature is not available in the set, the rest api for the same is not configured
	'features' : set(['GPIO', 'AI', 'PWM', 'SERVO', 'UART', 'SPI', 'I2C']),

	#the gpio pins, endpoints under the GPIO subsystem
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Digital-IO
	# GET /gpio/GPIO1_2
	# PUT /gpio/GPIO1_2?mode=output
	# POST /gpio/USR1 "data-in-post-body, either '1' or '0'"

	'GPIO' : {
		#rest endpoint to name mapping'GPIO0_2',
		#NOTE : a better way to extend this is (not only for GPIO, but other resources too)
		# 'rest-endpoint' : {	'name' : 'internal-mapping',
		#			'mode-allowed' : ['input', 'output'],
		#			'current-mode' : None,
		#			'pin-name' : 'P8_17',
		#			'other-info' : '***'
		#		}
		#'MODES' : { 'INPUT' : ['read'], 'OUTPUT' : ['write'], 
		#				'INOUT' :[ 'read', 'write'] }
		#
		# This way, if there is a request to write to a pin, 
		# Flask can handle all the filtering work. check if a mode is allowed for a pin,
		# and also check weather the action is allowed for the mode.
		#and when the mapping function is called, instead of passing the pin obj, it'll pass the dictionary,
		#this is so that the mapping function can manupilate the state of 'current-mode',etc.
		#XXX : not being implemented to keep things simple
		#plus the solution to pin conflict still remains. i.e. 2 resource taking same pin.i


		#GPIO bank 0
		'GPIO0_2' : 'GPIO0_2',
		'GPIO0_3' : 'GPIO0_3',
		'GPIO0_4' : 'GPIO0_4',
		'GPIO0_5' : 'GPIO0_5',
		'GPIO0_7' : 'GPIO0_7',
		'GPIO0_8' : 'GPIO0_8',
		'GPIO0_9' : 'GPIO0_9',

		'GPIO0_10' : 'GPIO0_10',
		'GPIO0_11' : 'GPIO0_11',
		'GPIO0_12' : 'GPIO0_12',
		'GPIO0_13' : 'GPIO0_13',
		'GPIO0_14' : 'GPIO0_14',
		'GPIO0_15' : 'GPIO0_15',
		'GPIO0_20' : 'GPIO0_20',
		'GPIO0_22' : 'GPIO0_22',
		'GPIO0_23' : 'GPIO0_23',
		'GPIO0_26' : 'GPIO0_26',
		'GPIO0_27' : 'GPIO0_27',
		'GPIO0_30' : 'GPIO0_30',
		'GPIO0_31' : 'GPIO0_31',

		#GPIO bank 1
		'GPIO1_0' : 'GPIO1_0',
		'GPIO1_1' : 'GPIO1_1',
		'GPIO1_2' : 'GPIO1_2',
		'GPIO1_3' : 'GPIO1_3',
		'GPIO1_4' : 'GPIO1_4',
		'GPIO1_5' : 'GPIO1_5',
		'GPIO1_6' : 'GPIO1_6',
		'GPIO1_7' : 'GPIO1_7',

		'GPIO1_12' : 'GPIO1_12',
		'GPIO1_13' : 'GPIO1_13',
		'GPIO1_14' : 'GPIO1_14',
		'GPIO1_15' : 'GPIO1_15',
		'GPIO1_16' : 'GPIO1_16',
		'GPIO1_17' : 'GPIO1_17',
		'GPIO1_18' : 'GPIO1_18',
		'GPIO1_19' : 'GPIO1_19',
		'GPIO1_28' : 'GPIO1_28',
		'GPIO1_29' : 'GPIO1_29',
		'GPIO1_30' : 'GPIO1_30',
		'GPIO1_31' : 'GPIO1_31',

		#GPIO bank 2
		'GPIO2_1' : 'GPIO2_1',
		'GPIO2_2' : 'GPIO2_2',
		'GPIO2_3' : 'GPIO2_3',
		'GPIO2_4' : 'GPIO2_4',
		'GPIO2_5' : 'GPIO2_5',
		'GPIO2_6' : 'GPIO2_6',
		'GPIO2_7' : 'GPIO2_7',
		'GPIO2_8' : 'GPIO2_8',
		'GPIO2_9' : 'GPIO2_9',

		'GPIO2_10' : 'GPIO2_10',
		'GPIO2_11' : 'GPIO2_11',
		'GPIO2_12' : 'GPIO2_12',
		'GPIO2_13' : 'GPIO2_13',
		'GPIO2_14' : 'GPIO2_14',
		'GPIO2_15' : 'GPIO2_15',
		'GPIO2_16' : 'GPIO2_16',
		'GPIO2_17' : 'GPIO2_17',
		'GPIO2_22' : 'GPIO2_22',
		'GPIO2_23' : 'GPIO2_23',
		'GPIO2_24' : 'GPIO2_24',
		'GPIO2_25' : 'GPIO2_25',

		#GPIO bank 3
		'GPIO3_14' : 'GPIO3_14',
		'GPIO3_15' : 'GPIO3_15',
		'GPIO3_16' : 'GPIO3_16',
		'GPIO3_17' : 'GPIO3_17',
		'GPIO3_19' : 'GPIO3_19',
		'GPIO3_21' : 'GPIO3_21',

		#the user led on the board
		'USR0' : 'USR0', #GPIO1_21
		'USR1' : 'USR1', #GPIO1_22
		'USR2' : 'USR2', #GPIO1_23
		'USR3' : 'USR3'  #GPIO1_24
	},
		
	#UART pins, endpoints under the uart subsystem
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Serial
	# GET /uart/1?read=24 ; read 24 bytes
	# PUT /uart/1?baud=9600 ;initialize serial1
	# POST /uart/2 "data-in-post-body"
	'UART' : {
		'1' : bbio.Serial1, 
		'2' : bbio.Serial2,
		'4' : bbio.Serial4,
		'5' : bbio.Serial5
	},

	#analog-in channels, endpoints for the AI resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Analog-to-digital-converter
	# GET /adc/0 ;returns value at channel 0
	'AI' : {
		'0': 'AIN0', # :to analog object or string itself
		'2': 'AIN2',
		'3': 'AIN3',
		'4': 'AIN4',
		'5': 'AIN5',
		'6': 'AIN6'
	},
	
	#pwm modules, endpoints under the pwm resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Pulse-width-modulation
	# POST /pwm/1A "value=120" ; set pwm value as 120
	# PUT /pwm/1A ; initializes PWM1A
	'PWM' : {
		'1A' : 'PWM1A', # :to pwm object
		'1B' : 'PWM1B',
		'2A' : 'PWM2A',
		'2B' : 'PWM2B'
	},
	
	#servo channels, endpoints under the servo resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Servo
	# PUT /servo/1A "config=enable"	; enables this module
	# POST /servo/1A "angle=50" 		; moves servo to 50 deg
	# PUT /servo/1A "config=disable"	; disables this module
	'SERVO' : {	
		'1A' : ('PWM1A', Servo.Servo()), # (channel, object)
		'1B' : ('PWM1B', Servo.Servo()),
		'2A' : ('PWM2A', Servo.Servo()),
		'2B' : ('PWM2B', Servo.Servo())

		#in init, s = SERVO['1A'][0]
			#SERVO['1A'][1].attach(s) 
		#again on disable, SERVO['1A'][1].detatch() 

		#This is why we need a tuple. tuple not necessary in case of UART, I2C, SPI 
		#as creating the object for the stream does not initialize it. here, Servo('PWM1A') 
		#automatically initializes the port by calling servo.attach(), 
		#hence making pins unavailable for other applications
	},

	#i2c streams, endpoints under the i2c resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/i2C
	# PUT /i2c/1 ; initialize i2c
	# GET /i2c/1?read=12 ;read 12 bytes of i2c stream
	'I2C' : {
		'1' : bbio.Wire1, # : i2c object
		'2' : bbio.Wire2
	},
	
	#SPI streams, endpoint for SPI resource
	# see : https://github.com/alexanderhiam/PyBBIO/wiki/SPI
	'SPI' : {
		'0' : bbio.SPI0, # : SPI object
		'1' : bbio.SPI1
	}

	#anything else? temp sensor, web cam, what else?
}


#####################
##function mappings##
#####################

#configure_gpio(pin_str, state)
	
#digitalWrite(pin_str, state)
	#this will recieve ('GPIOx_y', '0'/'1')

#serialWrite(serial_obj, data)
	#eg. this will recieve the Serial1 obj, "abcd" as the data
	#in another implementation, say RPi, serial_obj could be a string identifier!!
	#thats the best part, the implementation can vary, but 

#*** what about custom URLs?


##GPIO##
def config_gpio(pin, data):
	'''
	pin (str) 	: the value GPIO['rest-endpoint'], eg 'GPIO1_22'
	data (dict)	: extra information such as pull up/down etc.
	'''
	#we are configuring the mode
	if 'mode' in data:
		modes = {
			'INPUT'	 : 1, 
			'OUTPUT' : 0
			#IN_OUT mode available?
		}
		
		mode = data['mode'].upper()

		if pin in ['USR0', 'USR1', 'USR2', 'USR3'] and mode == 'INPUT':
			return "cannot set resource to desired mode", 403
		
		if mode in modes:
			#set the pin mode
			bbio.pinMode(pin, modes[mode])
			#record the change in the ep_modes dict
			ep_modes['GPIO'][pin] = mode
			return "OK", 200

		else :
			return "Invalid mode", 404
	else:
		return "invalid config paramater", 404

def write_gpio(pin, state, data):
	'''
	pin (str) 	: the value GPIO['rest-endpoint'], eg 'GPIO1_22'
	state (str) 	: '1' for HIGH, '0' for LOW
	data (dict)	: extra information (just in case)
	'''

	if 'OUT' not in ep_modes['GPIO'][pin]:
		return "Resource mode error", 403
		#i.e. OUTPUT, INOUT is OK

	states = {
		'HIGH'	: 1, 
		'LOW'	: 0
	}
	state = state.upper()
	if state in states:
		bbio.digitalWrite(pin, states[state])
		return "OK", 200

	else:
		return "Invalid state", 404


def read_gpio(pin, data):
	'''
	pin (str) 	: the value GPIO['rest-endpoint'], eg 'GPIO1_22'
	data (dict)	: extra information (just in case)
	'''
	if 'IN' not in ep_modes['GPIO'][pin]:
		return "Resource mode error", 403
		#i.e. INPUT, INOUT is OK

	if pin in ['USR0', 'USR1','USR2','USR3']:
		return "No permission to read", 403
	res = bbio.digitalRead(pin)
	return str(res), 200


## PWM ##
def config_pwm(pin, **kwargs):
	pass

def write_pwm(pin, value, **kwargs):
	pass

## AIN ##
def config_ain(pin, **kwargs):
	pass

def read_ain(pin, **kwargs):
	pass

## Serial ##
def config_serial():
	pass


####################
#status of all pins#
####################

#All the resource endpoint's status is to be maintained
	# non-init, input or output
	# the internal-pin-mapping to state dictionary.
	# this dict is to be used internally by mapping functions
	# flask code does not touch this in this implementation

#XXX: this is a temporary solution. go with the dict based method in board_config['GPIO'] 
#or is that solution an overkill? If i try to move too much logic into flask part, may become board dependent

ep_modes = {}
for feature in board_config['features']:
	ep_modes[feature] = {}

#ep_modes['GPIO']['ep'] = 'xyz'

###################
#need to keep track of which pins are being used by which resource
###################

#pins_res = {
#		'pin1' : 'feature' #feature as defined in board_config
#		'P8_12' : 'UART'
#	}
#
