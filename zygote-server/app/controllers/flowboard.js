//post new js code to execute
//format??
// {'target' : 'bbb', script="<well,the script... duh!>"}

var data = require("./data.js");
var sc = require("./socket_handler.js");

exports.post = function(req, res){
	//handles post request
	console.log("code posted to flowboard");

	var target = req.body['target'];
	//script is a json {code : "code-as-str"}
	var script = req.body['script'];
	//script can be built here; client can send json

	if(!target || !script){
		res.json({"error": "incorrect data format"});
		return;
	}

	if(target in data.spec){
		sc.execute(target, script, function(data){
			res.json(data);
		});
	}

	else{
		res.json({"error": "target container not found"});
	}
}