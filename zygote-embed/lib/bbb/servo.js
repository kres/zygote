// file to handle servo control
var b = require('bonescript');

function init(ep, opts, callback){
	//I could have a rest url to internal identifier map if reqd.
	this.pin = ep;
	this.angle = 0; //the initial angle; useful to read back data
	
	console.log("New Servo end point created");
	callback(this); //if there is an error, do what?
}


init.prototype.read = function read(data, callback){ 
	console.log("Servo Read : ", data);
	//return latest angle written
	callback({"value": this.angle.toString()});
};

init.prototype.write = function write(data, callback){ 
	console.log("Servo write : ", data);
	//the new angle to set the servo to
	var angle = parseInt(data['value']);
	angle = angle < 0? 0 : angle;
	angle = angle > 180? 180 : angle;
	//we need to calculate the duty cycle
	//normally freq => 50Hz, hi time for 0deg=> 0.5ms (2.5%)
	//hi time for 180deg => 2.3ms (12%)
	//therefore duty cycle in uptime ms, simple range mapping based on angle
	var duty_cycle = (0.025 + ((0.12-0.025) * angle / 180));
	console.log("writing to : " + this.pin);
	b.analogWrite(this.pin, duty_cycle, 50, function(x){
		if(x.err){
			console.log("SERVO write error");
			callback({"error" : x.err});
		}
		else{
			console.log("SERVO write successful");
			this.angle = angle;
			callback({"value": this.angle.toString()});
		}
	});
};

init.prototype.config = function config(data, callback){ 
	console.log("PWM config : ", data);
	callback({"value":"something configured"});
};

init.prototype.delete = function del(data, callback) {
	console.log("PWM delete : ", data);
	callback({"value":"cleanup done"});
};

exports.init = init;

