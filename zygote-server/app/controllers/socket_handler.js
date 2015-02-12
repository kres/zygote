//handles the incoming socket connections properly
//does routing work too
var data = require('./data.js');

exports.startSocket = function(server){
	//create the web-socket manager
	var io = require('socket.io')(server);

	io.on('connection', function(socket){
		socket.on('url', function(data){
			console.log(data);
		});
	})
}