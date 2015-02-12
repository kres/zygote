//the main js file handles the communication to and from zygote server
//powered by socket-io-client
var url = 'bbb';
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
	socket.emit('url', {"data": url});
});
