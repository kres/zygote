from flask import Flask, request
from flask.ext import restful

app = Flask(__name__)
api = restful.Api(app)

#TODO : read the config file
# import the file pointed by config, and use it.

class GPIO(restful.Resource):

	def put(self, pin):
		#configure the pin
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
