//this is the data abstraction layer
//dal.getPanels
//dal.getWidgets(panel-name)
//etc etc. whatever interface is suitable 

/***************API*******************/
//DB (dashboard)
//	db.addPanel(panel)
//	db.addWidget(panel_id, widget)
//	db.deletePanel(panel)
//	db.deleteWidget(widget)
//	db.getJSON()

//res (resource)
//	res.addResource(panel_id, widget);
//	res.getResource(ep); // "panel-id/widget-id"

//flows (flows to execute)
//	flows.getFlow(flow_id)
//	flows.addFlow(flow_id, flow_struct);
//	flows.deleteFlow(flow_id);
