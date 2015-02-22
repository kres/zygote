// handle pwm on the beaglebone black

var b = require('bonescript');

function init(ep, opts, callback){
	this.pin = ep;
	this.freq = 50;
	this.duty = 0;
	
	console.log("New PWM output created");
	callback(this); 
}


init.prototype.read = function read(data, callback){ 
	console.log("PWM val: ", data);
	//return pwm's duty cycle
	callback({"value": this.duty.toString()});
};

init.prototype.write = function write(data, callback){ 
	console.log("PWM write : ", data);
	console.log("writing to : " + this.pin);

	var duty = parseFloat(data['value']);

	if(duty > 1){
		duty = 1;
	}
	if(duty < 0){
		duty = 0;
	}

	//assume freq = 50
	b.analogWrite(this.pin, duty, this.freq, function(x){
		if(x.err){
			console.log("PWM write error");
			callback({"error" : x.err});
		}
		else{
			console.log("PWM write successful");
			this.duty = duty;
			callback({"value": this.duty.toString()});
		}
	});
};

init.prototype.config = function config(data, callback){ 
	console.log("PWM config : ", data);
	//XXX : how about I put freq here (ONLY for time being)
	callback({"value":"something configured"});
};

init.prototype.delete = function del(data, callback) {
	console.log("PWM delete : ", data);
	callback({"value":"cleanup done"});
};

exports.init = init;

