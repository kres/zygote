// This controller handles the incoming request of active resource instances
// eg. /container/gpio/1
// When model handling resurce type 

module.exports = function (req, res) {
		console.log("Resource instance : "+req.url);
		res.send('ok');
	};
