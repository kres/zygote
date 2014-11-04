config = {
	'board' : 'Beaglebone Black',
	#if a feature is not available in the set, the rest api for the same is not configured
	'features' : set(['GPIO', 'AI', 'PWM', 'SERVO', 'UART', 'SPI', 'I2C']),
	'GPIO' : {
			#gpio bank
			'0' : {
				#gpio pin to friendly name mapping
				'2' : 'GPIO0_2',
				'3' : 'GPIO0_3',
				'4' : 'GPIO0_4',
				'5' : 'GPIO0_5',
				'6' : 'GPIO0_6',
				'7' : 'GPIO0_7',
				'8' : 'GPIO0_8',
				'9' : 'GPIO0_9',
				'10' : 'GPIO0_10',
				'11' : 'GPIO0_11',
				'12' : 'GPIO0_12',
				'13' : 'GPIO0_13',
				'14' : 'GPIO0_14',
				'20' : 'GPIO0_15',
				'22' : 'GPIO0_22',
				'23' : 'GPIO0_23',
				'26' : 'GPIO0_26',
				'27' : 'GPIO0_27',
				'30' : 'GPIO0_30',
				'31' : 'GPIO0_31'
			},

			'1' : {
				'0' : 'GPIO1_0',
				'1' : 'GPIO1_1',
				'2' : 'GPIO1_2',
				'3' : 'GPIO1_3',
				'4' : 'GPIO1_4',
				'5' : 'GPIO1_5',
				'6' : 'GPIO1_6',
				'7' : 'GPIO1_7',
				'12': 'GPIO1_12',
				'13': 'GPIO1_13',
				'14': 'GPIO1_14',
				'15': 'GPIO1_15',
				'16': 'GPIO1_16',
				'17': 'GPIO1_17',
				'18': 'GPIO1_18',
				'19': 'GPIO1_19',
				'28': 'GPIO1_28',
				'29': 'GPIO1_29',
				'30': 'GPIO1_30',
				'31': 'GPIO1_31'
			},

			'2' : {
				'1' : 'GPIO2_1',
				'2' : 'GPIO2_2',
				'3' : 'GPIO2_3',
				'4' : 'GPIO2_4',
				'5' : 'GPIO2_5',
				'6' : 'GPIO2_6',
				'7' : 'GPIO2_7',
				'8' : 'GPIO2_8',
				'9' : 'GPIO2_9',
				'10' : 'GPIO2_10',
				'11' : 'GPIO2_11',
				'12' : 'GPIO2_12',
				'13' : 'GPIO2_13',
				'14' : 'GPIO2_14',
				'15' : 'GPIO2_15',
				'16' : 'GPIO2_16',
				'17' : 'GPIO2_17',
				'22' : 'GPIO2_22',
				'23' : 'GPIO2_23',
				'24' : 'GPIO2_24',
				'25' : 'GPIO2_25'
			},

			'3' : {
				'14' : 'GPIO3_14', 
				'15' : 'GPIO3_15', 
				'16' : 'GPIO3_16', 
				'17' : 'GPIO3_17', 
				'19' : 'GPIO3_19', 
				'21' : 'GPIO3_21',
				
			}

	},
		
	'UART' : {

	},

	'AI' : {
	
	},
	
	'PWM' : {

	},

	'SERVO' : {

	},

	'I2C' : {

	},

	'SPI' : {

	}

	#anything else? temp sensor, web cam, what else?

}
