from flask.ext import restful

#change this to an zygote plugin based thing
#eg. temp = zygote.plugin()
#    temp.do_get = def foo(query_dict)

plugin_set = ['TEMP', 'LOC']

########################
# peudo sensor plugins #
########################
from random import randint

class TEMP(restful.Resource):
    def get(self):
	temp = randint(20,30)
	print temp
        return str(temp), 200

class LOC(restful.Resource):
	def get(self):
		#return "12.934268,77.534326,17z", 200
		return "37.240,-115.81111", 200
		#latitude, longitide, zoom level - for PESU

##add magnetometer :p
