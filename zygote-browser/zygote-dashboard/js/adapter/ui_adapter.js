//this is the UI adapter file 
//handles all incoming events
//talks to socket_handler.js and dal.js

/*
The UI API : 
	getDefaultContainer() : returns Container
	container.getPanels() : returns {<id> : <panel-obj>, ...}
	panel.getWidgets()    : returns {<id> : <widget-obj>, ...}
*/

var container = getDefaultContainer();

container.on("new-panel", function(panel){

	console.log("New panel has been created");
	dal.db.addPanel(panel);

	panel.on("new-widget", function(widget){
		console.log("New widget created!");
		dal.db.addWidget(panel.id, widget);
		dal.res.addResource(panel.id, widget);
	});

	//should delete be a event on panel or on widget??
	panel.on("delete-widget", function(widget){
		console.log("Deleteing widget");
		dal.db.deleteWidget(panel.id, widget);
	});
});

container.on("delete-panel", function(panel){
	console.log("Panel deleted");
	dal.db.deletePanel(panel);
});
