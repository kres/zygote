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
	return data

class GPIO(restful.Resource):
	
	#to configure a gpio pin
	def put(self, pin):
		pin_val = board.board_config['GPIO'].get(pin, None)

		#invalid resource point
		if not pin_val:
			return "Non existing resource", 404

		args = dict(request.form)
		#if the pin exists configure it
		board.config_gpio(pin_val, args)
		pass

	def get(self, pin):
		#read the pin
		pass

	def post(self, pin):
		#write to the pin
		pass


api.add_resource(GPIO, '/gpio/<string:pin>')

if __name__ == '__main__':
	app.run(debug=True)
