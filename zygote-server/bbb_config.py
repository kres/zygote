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

from bbio import *
from Servo import *

import atexit
atexit.register(bbio.bbio_cleanup)

bbio.bbio_init()

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
		'USR0' : 'USR0',
		'USR1' : 'USR1',
		'USR2' : 'USR2',
		'USR3' : 'USR3'
	},
		
	#UART pins, endpoints under the uart subsystem
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Serial
	# GET /uart/1?read=24 ; read 24 bytes
	# PUT /uart/1?baud=9600 ;initialize serial1
	# POST /uart/2 "data-in-post-body"
	'UART' : {
		'1', # : Serial1 stream object
		'2',
		'3',
		'4',
		'5'
	},

	#analog-in channels, endpoints for the AI resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Analog-to-digital-converter
	# GET /adc/AIN0 ;returns value at channel 0
	'AI' : {
		'AIN0', # :to analog object or string itself
		'AIN2',
		'AIN3',
		'AIN4',
		'AIN5',
		'AIN6'
	},
	
	#pwm modules, endpoints under the pwm resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Pulse-width-modulation
	# POST /pwm/1A "value=120" ; set pwm value as 120
	# PUT /pwm/1A ; initializes PWM1A
	'PWM' : {
		'1A', # :to pwm object
		'1B',
		'2A',
		'2B'
	},
	
	#servo channels, endpoints under the servo resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/Servo
	# PUT /servo/PWM1A "config=enable"	; enables this module
	# POST /servo/PWM1A "angle=50" 		; moves servo to 50 deg
	# PUT /servo/PWM1A "config=disable"	; disables this module
	'SERVO' = {
		'PWM1A', # : servo object
		'PWM1B',
		'PWM2A',
		'PWM2B'
	},

	#i2c streams, endpoints under the i2c resource
	#see : https://github.com/alexanderhiam/PyBBIO/wiki/i2C
	# PUT /i2c/1 ; initialize i2c
	# GET /i2c/1?read=12 ;read 12 bytes of i2c stream
	'I2C' : {
		'1', # : i2c object
		'2'
	},
	
	#SPI streams, endpoint for SPI resource
	# see : https://github.com/alexanderhiam/PyBBIO/wiki/SPI
	'SPI' : {
		'0', # : SPI object
		'1'
	}

	#anything else? temp sensor, web cam, what else?
}


#####################
##function mappings##
#####################

#configure_gpio(pin_str, state)
	
#TODO : make sure that no namespace conflict happens due to bbio
#digitalWrite(pin_str, state)
	#this will recieve ('GPIOx_y', '0'/'1')

#serialWrite(serial_obj, data)
	#eg. this will recieve the Serial1 obj, "abcd" as the data
	#in another implementation, say RPi, serial_obj could be a string identifier!!
	#thats the best part, the implementation can vary, but 

#i2cRead(streamObj, num_bytes)
	#well, you know what it does.

####################
#status of all pins#
####################

#All the resource endpoint's status is to be maintained
	# non-init, input or output
	#the flask code does the checking
