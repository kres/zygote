//This file is just to serve the application

var express = require('./config/express');
var app = express();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');

