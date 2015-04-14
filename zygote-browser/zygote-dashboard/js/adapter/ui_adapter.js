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

container.on("panel-added", function(panel){

	console.log("New panel has been created");
	dal.db.addPanel(panel);

	panel.on("widget-added", function(widget){
		console.log("New widget created!");
		dal.db.addWidget(panel.id, widget);
		dal.res.addResource(panel.id + "/" + widget.id);
	});

	//should delete be a event on panel or on widget??
	panel.on("widget-removed", function(widget){
		console.log("Deleteing widget");
		dal.db.deleteWidget(panel.id, widget);
		dal.res.deleteResource(panel.id + "/" + widget.id);
	});
});

container.on("panel-removed", function(panel){
	console.log("Panel deleted");
	dal.db.deletePanel(panel);
});
