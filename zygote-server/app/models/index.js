//Handles interaction with rest urls

/*
 * id => the REST url component - the resource to manipulate 
 * data => the json data associated with the request
 * callback => function to call when operation is done
*/

//TODO : have to differenciate between resource types and instances

exports.read = function (id, data, callback){
		console.log('READ : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};


exports.write = function (id, data, callback){
		console.log('WRITE : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};


exports.update = function (id, data, callback){
		console.log('CONFIG : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};


exports.del = function (id, data, callback){
		console.log('DELETE : '+id+' : '+ JSON.stringify(data));
		callback("<h1>OKAY</h1>");
	};
