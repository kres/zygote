function Panel(panelID) {
    
    Panel.prototype = $.extend(EventEmitter.prototype, {});
    
    this.widgets = {};
    this.panelObj = undefined;
    this.container = undefined;
    this.panelID = panelID;
    
    this.create = function(container) {
        this.container = container;
        
        this.panelObj = $(document.createElement("div"));
        this.panelObj.addClass("panel panel-primary");
        this.panelObj.attr("id", this.panelID);
        this.panelObj.css("width", "300px").css("height", "650px");
        
        //Create a menu/toolbar.
        addPanelToolbar(this.panelObj)
        setPanelListeners(this);
        
        this.panelObj.resizable({
            minWidth : 300,
            minHeight : 650,
            maxWidth : 920,
            maxHeight : 1250,
            grid : [310, 295]
        });
        
        addPanelGrid(this.panelObj);
        
        container.containerObj.children(".panel-container").append(this.panelObj);
        
        return this;
    }
    
    
    this.getWidgets = function () {
        return this.widgets;
    }
    
    this.getWidget = function (widgetID) {
        return this.widgets[widgetID];
    }
    
    this.addWidget = function (widgetID) {
        
        var widget = new Widget(widgetID);
        widgets[widgetID] = widget.create(this);
        
        //Emit event: create-widget
    }
    
    this.removeWidget = function (widgetID) {
        
        this.widgets[widgetID].widgetObj.remove();
        delete this.widgets[widgetID];
        
        //Emit event: delete-widget
    }
}