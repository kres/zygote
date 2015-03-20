//this is the js file for the wifi service
/*
A general overview to how this works : 
	1. Developer specifies the interface to use in conf file
		(i.e.) conf.wifi.interface = "usb0" (or "eth1" etc.)

	2. When the program starts, "wifi.onLoad" of this module is called 

	3. This onLoad function reads the interface from conf file;
		and gets associated IP address of the interface
		It then sets a call back which scans the LAN of that 
		interface for newly joining nodes. callbk is set to 10sec

	4. Every time a new node is found, or a old node leaves, the 
		"wifi" service field in the spec file is updated

	5. The client browser notes this change and makes correct amends.

	6. When creating a new network/wifi sensor resource, 
		(s)he user is able to choose from a list of dropdown IP addresses
XXX : What to do if a active node leaves. How to handle such arror conditions
*/

var os = require( 'os' );
var networkInterfaces = os.networkInterfaces( );

var conf = require("../../conf.js");
var spec = require("./spec.js");

exports.onLoad = function(){
	var i = conf.service.wifi['interface'];
	if(!networkInterfaces[i]){
		console.log("ERROR : WiFi service not initialized");
		return;
	}

	var info = networkInterfaces[i][0];
	var ip = info['address'];
	ip = conf.service.wifi['ip'] || (ip.substr(0, ip.length-1) + "1-25");
	//if ip range is mentioned in conf, that is taken; else read from net interface
	//if IP "192.168.7.2" it becomes => "192.168.7.1-30" and will be used by nmap
	console.log("Starting wifi service in ip range : "+ ip );
	function scan(){
		get_ips(ip, function(res){
		//	console.log("WIFI : res - "+ res);
			//update the spec file
			spec.service.wifi = res;
			//call scan again -- in 5sec
			setTimeout(scan, 5000);
		});
	};
	scan();
};

function get_ips(ip_range, callback){
	var child_process = require('child_process');
	child_process.exec('nmap -sP '+ip_range, function (err, stdout, stderr){
		if (err) {
			console.log("child processes failed with error code: " +
		    err.code);
		}
		//all mombo jumbo below is to parse the 
		//nmap output from stdout
	    	var list = stdout.trim().split('\n');
		list = list.slice(1, list.length-2);
		
		var res = [];
		for(var i=0; i<list.length;i++){
			var e = list[i];
			var regx = /\d+\.\d+\.\d+\.\d+/;
			var match = e.match(regx);
			if(match){
				res.push(match[0]);
			}
	    	}
		callback(res);
	});
}

