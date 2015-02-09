//The file responsible for adding routes

module.exports = function(app) {
		var index = require('../controllers/index.js');
		var res_type = require('../controllers/res_type.js');

		app.get('/', index);
		app.get('/container/*/$', res_type.get);
		app.post('/container/*/$', res_type.post);
		app.put('/container/*/$', res_type.put);
		app.delete('/container/*/$', res_type.del);
	};
