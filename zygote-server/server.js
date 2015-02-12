//This file is just to serve the application
var socket_handler = require("./app/controllers/socket_handler.js");
var express = require('./config/express');
var app = express();

//starts express app as well as socket.io
socket_handler.startSocket(app.listen(3000));

module.exports = app;
console.log('Server running at http://localhost:3000/');

