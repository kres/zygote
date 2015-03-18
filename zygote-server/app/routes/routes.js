//The file responsible for adding routes

module.exports = function(app) {
		var index = require('../controllers/index.js');
		var res_type = require('../controllers/res_type.js');
		var containers = require('../controllers/containers.js')
		var data =  require('../controllers/data.js');
		var fb = require('../controllers/flowboard.js');

		app.get('/', index);

		app.get('/containers/', containers.get);
		app.post('/containers/', containers.post);

		app.get('/meta', function(req, res){
			res.json(data.meta);
		});

		app.post('/flowboard', fb.post);
		app.delete('/flowboard', fb.delete);
	};
