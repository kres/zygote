//The file responsible for adding routes

module.exports = function(app) {
		var index = require('../controllers/index.js');
		var container = require('../controllers/container.js');

		app.get('/', index);
		app.all('/container/*/$', container);
	};
