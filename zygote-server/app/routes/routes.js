//The file responsible for adding routes

module.exports = function(app) {

		var containers = require('../controllers/containers.js')
		var data =  require('../controllers/data.js');
		var fb = require('../controllers/flowboard.js');
		var db = require('../controllers/dashboard.js');

		app.get('/containers/', containers.get);
		app.post('/containers/', containers.post);

		app.get('/meta', function(req, res){
			res.json(data.meta);
		});

		app.post('/flowboard', fb.post);
		app.delete('/flowboard', fb.delete);

		app.get('/dashboard/events', db.events);
		app.post('/dashboard/*', db.write);
		app.get('/dashboard/*', db.read);
		app.put('/dashboard/*', db.config);
	};
