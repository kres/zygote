//this is the data access layer
//methods to access data for Dashboard, Flows and Resource

var dal 	 = {};
dal['db']	 = {};
dal['res']	 = {};
dal['flows'] = {};

//these actually holds the data
var db_data 	= {};
/*
db_data : {
	panel_id : {
		widget_id : <widget-obj>
		...
	},
	...
}
*/
var res_data	= {};
var flow_data	= {};

/***************API*******************/

//DB (dashboard)
//	db.addPanel(panel)
//	db.addWidget(panel_id, widget)
//	db.getWidget(panel_id, widget_id)
//	db.deletePanel(panel)
//	db.deleteWidget(panel_id, widget)
//	db.getJSON()

dal.db.addPanel = function(panel){
	db_data[panel.id] = {};
};

dal.db.addWidget = function(panel_id, widget){
	if(panel_id in db_data){
		// panel-1/widget-1 : slider
		// panel-2/widget-2 : gauge
		db_data[panel_id][widget.id] = widget;
	}
	else{
		console.log("Adding widget to non existing panel");
	}
};

dal.db.getWidget = function(panel_id, widget_id){
	if(panel_id in db_data 
	  && widget_id in db_data[panel_id]){
		return db_data[panel_id][widget_id];
	}
	else{
		return null;
	}
};

dal.db.deletePanel = function(panel){
	if(panel.id in db_data){
		delete db_data[panel.id];
	}
	else{
		console.log("Trying to delete non existing panel");
	}
};

dal.db.deleteWidget = function(panel_id, widget){
	if(panel_id in db_data && widget.id in db_data[panel_id]){
		delete db_data[panel_id][widget.id];
	}
	else{
		console.log("Trying to delete non existing widget");
	}
};

/* The getJSON func returns data in following format
db_data : {
	panel_id : {
		widget_id : "widget_type";
		...
	},
	...
}
*/
dal.db.getJSON = function(){
	var json = {};
	for(var panel_id in db_data){
		json[panel_id] = {};
		for(var widget_id in db_data[panel_id]){
			json[panel_id][widget_id] = db_data[panel_id][widget_id].type;
		}
	}
	return json;
};

//res (resource)
//	res.addResource(ep); ep => "panel-id/widget-id"
//	res.getResource(ep); 
//	res.deleteResource(ep);

dal.res.addResource = function(ep){
	res_data[ep] = new Resource("dashboard", ep);
};

dal.res.getResource = function(ep){
	return res_data[ep];
};

dal.res.deleteResource = function(ep){
	if(res_data[ep])
		delete res_data[ep];
	else
		console.log("No resource to be deleted");
};

//flows (flows to execute)
//	flows.getFlow(flow_id)
//	flows.addFlow(flow_id, flow_struct);
//	flows.deleteFlow(flow_id);

dal.flows.getFlow = function(flow_id){
	return flow_data[flow_id];
};

dal.flows.addFlow = function(flow_id, flow_struct){
	flow_data[flow_id] = flow_struct;
};

dal.flows.deleteFlow = function(flow_id){
	if(flow_data[flow_id])
		delete flow_data[flow_id];
};
