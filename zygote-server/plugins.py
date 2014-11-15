from flask.ext import restful
#change this to an zygote plugin based thing
#eg. temp = zygote.plugin()
#    temp.do_get = def foo(query_dict)

plugin_set = ['TEMP']

class TEMP(restful.Resource):
    def get(self):
        return 'test plugin', 200

