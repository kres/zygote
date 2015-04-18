function addPanelToolbar(panel) {
    var toolbar = $(document.createElement("div"));
    toolbar.addClass("panel-heading");
    
    var name =  $(document.createElement("h4")).addClass("panel-name").html(panel.panelID);
    var rfr = $(document.createElement("button")).addClass("btn btn-info panel-btn refresh").append($(document.createElement("span")).addClass("fa fa-refresh fa-lg"));
    var rmv = $(document.createElement("button")).addClass("btn btn-danger panel-btn remove").append($(document.createElement("span")).addClass("fa fa-remove fa-lg"));
    var add = $(document.createElement("button")).addClass("btn btn-success panel-btn add").append($(document.createElement("span")).addClass("fa fa-plus fa-lg"));
    
    toolbar.append(name);
    toolbar.append(rfr)
    toolbar.append(rmv)
    toolbar.append(add)
    panel.panelObj.append(toolbar);
    
}

function addPanelGrid(panelObj) {
    var grid = $(document.createElement("div"));
    grid.addClass("widget-container");
    
    grid.sortable();
    panelObj.append(grid);
}

function setPanelListeners(panel) {
    panel.panelObj.find(".btn.add").on("click", function () {
        $("#addWidgetModal").data("trigger", panel);
        $("#addWidgetModal").modal('show');
    });
    
    panel.panelObj.find(".btn.remove").on("click", function () {
        panel.container.removePanel(panel.panelID);
    });                                       
}

function Panel(panelID) {
    
    $.extend(Panel.prototype, EventEmitter.prototype);
    
    this.widgets = {};
    this.panelObj = undefined;
    this.container = undefined;
    this.panelID = panelID;
    this.id = panelID;
    
    this.create = function(container) {
        this.container = container;
        
        this.panelObj = $(document.createElement("div"));
        this.panelObj.addClass("panel panel-primary");
        this.panelObj.attr("id", this.panelID);
        this.panelObj.css("width", "300px").css("height", "650px");
        
        //Create a menu/toolbar.
        addPanelToolbar(this)
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
    
    this.addWidget = function (widgetID, widgetType, widgetOptions) {
        
        var widget = new widgets[widgetType].class(widgetID);
        this.widgets[widgetID] = widget.create(this, widgetOptions);
        
        //Emit event: widget-added
        this.emitEvent("widget-added", [widget])
    }
    
    this.removeWidget = function (widgetID) {
        //Emit event: widget-removed
         this.emitEvent("widget-added", [this.widgets[widgetID]]);
        
        this.widgets[widgetID].widgetObj.remove();
        delete this.widgets[widgetID];
        
    }
    
    this.resizeWidth = function (xwidth) {
        this.panelObj.css("width", 300 + (310 * xwidth));
    }
    
    this.resizeHeight = function (xheight){
        this.panelObj.css("height", 650 + (295 * xheight));
    }
}