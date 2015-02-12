//handles the incoming socket connections properly
//does routing work too
var data = require('./data.js');

//contains container name to socket object mapping
var sock_map = {};

exports.startSocket = function(server){
	//create the web-socket manager
	var io = require('socket.io')(server);

	io.on('connection', function(socket){

		socket.on('url', function(msg){
			//msg is a string, such as : 'bbb', 'rpi'
			//if the board is available 
			if(msg in data.spec){
				//add a mapping 
				sock_map[msg] = socket;
				
				//add data handler
				socket.on('data', function(req, callback){
					//req contains the request data
					//req : {'container' : 'bbb', 'res' : 'gpio/1', 'op' : 'read',data : {}}
					if(req['container'] in sock_map){
						sock_map[req['container']].emit('data', req, function(ret_val){
							callback(ret_val);
						})
					}
					else{
						callback({"error": "no such container"});
					}
				});

				//add disconnect handler 
				socket.on('disconnect', function(){
					if(msg in sock_map) delete sock_map[msg];
				});

			}
			else{
				socket.disconnect();
			}
		});
	});
}
