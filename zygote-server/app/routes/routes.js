//The file responsible for adding routes

module.exports = function(app) {
		var index = require('../controllers/index.js');
		var res_type = require('../controllers/res_type.js');
		var containers = require('../controllers/containers.js')

		app.get('/', index);

		app.get('/containers/', containers.get);
		app.post('/containers/', containers.post);
	};
