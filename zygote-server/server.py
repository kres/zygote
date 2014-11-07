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
		return  board.config_gpio(pin_val, **data)
		
	#read the pin
	def get(self, pin):
		print "call to GPIO get"
		pin = pin.upper()
		pin_val = board.board_config['GPIO'].get(pin, None)

		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)
		
		print "return from GPIO get"
		#if the pin exists configure it
		return board.read_gpio(pin_val, **data)

	#write to the pin	
	def post(self, pin):
		print "call to GPIO post"
		pin = pin.upper()
		pin_val = board.board_config['GPIO'].get(pin, None)
		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		data = get_dict(request.form)

		state = data.pop('state',None)
		if not state:
			return "no state info", 404
		
		print pin_val, state, data
		print "return from GPIO post"
		print board.write_gpio
		return board.write_gpio(pin_val, state, **data)


#TODO : rather than adding resource manually, add it by reading the 
	#features list in the board_config dictionary
api.add_resource(GPIO, '/gpio/<string:pin>')


if __name__ == '__main__':
	app.run('0.0.0.0')

