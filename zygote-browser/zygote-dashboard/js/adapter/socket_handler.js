//this file handles the socket connection to the zygote server
//uses socket.io browser side client library to make the communication.

var socket = io('http://localhost');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});