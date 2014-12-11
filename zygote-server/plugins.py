from flask.ext import restful

#change this to an zygote plugin based thing
#eg. temp = zygote.plugin()
#    temp.do_get = def foo(query_dict)

plugin_set = ['TEMP', 'LOC']

########################
# peudo sensor plugins #
########################
from random import randint

#show in gauge
class TEMP(restful.Resource):
    def get(self):
	temp = randint(20,30)
	print temp
        return str(temp), 200

#show in MAP
class LOC(restful.Resource):
	def get(self):
		#return "12.934268,77.534326,17z", 200
		return "37.240,-115.81111", 200
		#latitude, longitide, zoom level - for PESU

#show in pointer
class COMPASS(restful.Resource):
	def get(self):
		return "90"

#show in graph
class GAS(restful.Resource):
	def get(self):
		concentration = randint(20,25)
        	return str(concentration), 200

#binary light representation
class BELL(restful.Resource):
	def get(self):
		return str(randint(0,1)), 200


