//post new js code to execute
//format??
exports.post = function(req, res){
	//handles post request
	console.log("code posted to flowboard");
	res.json({"status": "ok"});
}