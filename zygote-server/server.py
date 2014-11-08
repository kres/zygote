from flask import Flask, request
from flask.ext import restful
import setup as board

app = Flask(__name__)
api = restful.Api(app)

def get_dict(immu_dict):
	'''
	changes the immutable dict to dict
	'''
	data = dict(immu_dict)
	#ImmutableMultiDict([('hello2', u'world2'), ('hello', u'world1'), 
	#	('hello', u'another-world')])
	#data : {'hello2': [u'world2'], 'hello': [u'world1', u'another-world']}

	for key in data:
		val = data[key]
		if len(val) == 1:
		#extract from list, covert unicode to str
			data[key] = str(val[0])
		else:
			data[key] = map(str, val)
	#now data: {'hello2':world2', 'hello':['world1','another-world']}
	return data


class GPIO(restful.Resource):
	
	#to configure a gpio pin
	def put(self, pin):
		print "call to GPIO put"
		pin = pin.upper()

		pin_val = board.board_config['GPIO'].get(pin, None)

		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)
		print "return from GPIO put"
		#if the pin exists configure it
		return  board.config_gpio(pin_val, data)
		
	#read the pin
	def get(self, pin):
		print "call to GPIO get"
		pin = pin.upper()
		pin_val = board.board_config['GPIO'].get(pin, None)

		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.args)
		
		return board.read_gpio(pin_val, data)

	#write to the pin	
	def post(self, pin):
		print "call to GPIO post"
		pin = pin.upper()
		pin_val = board.board_config['GPIO'].get(pin, None)
		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)

		state = data.get('state',None)
		if not state:
			return "no state info", 404
		
		print pin_val, state, data
		return board.write_gpio(pin_val, state, data)

class PWM(restful.Resource):
	
	def put(self, pin):
		print "call to pwm put"
		pin = pin.upper()
		pin_val = board.board_config['PWM'].get(pin, None)

		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)
		return board.config_pwm(pin_val, data)

	def get(self, pin):
		print "call to pwm get"
		return "not supposed to happen", 404

	def post(self, pin):
		print "call to pwm post"

		pin = pin.upper()

		pin_val = board.board_config['PWM'].get(pin, None)
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)

		if 'value' in data:
			return board.write_pwm(pin_val, data['value'], data)
		else:
			return "no value provided", 403


#TODO : rather than adding resource manually, add it by reading the 
	#features list in the board_config dictionary
api.add_resource(GPIO, '/gpio/<string:pin>')
api.add_resource(PWM, '/pwm/<string:pin>')

if __name__ == '__main__':
	app.run('0.0.0.0', debug=True)

