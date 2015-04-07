//this is the data access layer
//methods to access data for Dashboard, Flows and Resource

var dal 	 = {};
dal['db']	 = {};
dal['res']	 = {};
dal['flows'] = {};

//these actually holds the data
var db_data 	= {};
var res_data	= {};
var flow_data	= {};

/***************API*******************/
//DB (dashboard)
//	db.addPanel(panel)
//	db.addWidget(panel_id, widget)
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
		db_data[panel_id][widget.id] = widget.type;
	}
	else{
		console.log("Adding widget to non existing panel");
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

dal.db.getJOSN = function(){
	return db_data;
};

//res (resource)
//	res.addResource(panel_id, widget);
//	res.getResource(ep); // "panel-id/widget-id"

//flows (flows to execute)
//	flows.getFlow(flow_id)
//	flows.addFlow(flow_id, flow_struct);
//	flows.deleteFlow(flow_id);
