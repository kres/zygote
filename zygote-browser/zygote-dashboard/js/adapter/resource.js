// the resource js file 
// similar to zygote embed 
// holds url to real obj mapping

function Resource(container, path){
	//container = "dashboard"
	//path = panel-name/widget-name
	this.container = container;
	if(container == "dashboard"){
		this.panel = path.split("/")[0];
		this.widget = path.split("/")[1];
		this.obj = dal.db.getWidget(panel, widget);
	}
	else{
		this.ep = path;
	}
}

//container : "bbb" or "dashboard"
//path 		: "gpio/1" or "wifi-temp/1"

Resource.prototype.read = function(args, callback){
	if(this.container == "dashboard"){
		this.obj.read(args, callback);
	}
	else{
		sh.read({ "container" 	: this.container
				, "ep" 			: this.ep
				, "data" 		: args}, callback);
	}
}

Resource.prototype.write = function(args, callback){
	if(this.container == "dashboard"){
		this.obj.write(args, callback);
	}
	else{
		sh.write({ "container" 	: this.container
				 , "ep" 		: this.ep
				 , "data" 		: args}, callback);
	}
}

Resource.prototype.config = function(args, callback){
	if(this.container == "dashboard"){
		this.obj.config(args, callback);
	}
	else{
		sh.config({ "container" : this.container
				  , "ep" 		: this.ep
				  , "data" 		: args}, callback);
	}
}
