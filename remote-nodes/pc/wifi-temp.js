//test sensor for wifi-temp 
//it should actually return the value of the sensor it reads

var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8894;

net.createServer(function(sock) {
	
	// We have a connection - a socket object is assigned to the connection automatically
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
	
	// Add a 'data' event handler to this instance of socket
	sock.on('data', function(data) {
		console.log('DATA ' + sock.remoteAddress + ': ' + data);
		
		//maybe data can be json later;
		//will totally depend on sensor
		if(data == 'read'){
			console.log("writing data");
			sock.write("10.0");
		}
		
	});
	
	// Add a 'close' event handler to this instance of socket
	var addr = sock.remoteAddress;
	var port = sock.remotePort;
	sock.on('close', function(data) {
		console.log('CLOSED: ' + addr +' '+ port);
	});
	
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
