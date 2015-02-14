//this will have gpio related functions
//init() => will return the object
//object will have `read`, `write` and `config` methods.

//useage => local_map['url'] = new require('./path/gpio.js')('end-point');

/*
CODE STRUCTURE
-----------------------
*/

//module.exports = function init(ep, opts, callback){ } --constructor
//or exports.init


//init.prototype.read = function read(info, callbk){ }
//init.prototype.write = function write(info, callbk){ }
//init.prototype.config = function config(info, callbk){ }
//init.prototype.delete = function delete() {}
