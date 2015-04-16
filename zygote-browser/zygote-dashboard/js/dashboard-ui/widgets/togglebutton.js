function addToggleButton(widget) {
    var toggleButton = $(document.createElement("input"))
    toggleButton.addClass("toggle-button-widget");
    toggleButton.attr("type", "checkbox");
    toggleButton.attr("checked","checked");
    toggleButton.data("toggle","toggle");
    
    toggleButton.data("widget", widget);
    widget.widgetObj.find(".panel-body").append(toggleButton);
    
    return toggleButton
}

function ToggleButtonWidget(widgetID) {
    
    $.extend(ToggleButtonWidget.prototype, EventEmitter.prototype);
    
    this.widgetID = widgetID;
    this.id = widgetID;
    this.type = "toggleButton";
    this.widgetObj = undefined;
    this.panel = undefined;
    
    this.options = { onText : "ON", offText: "OFF", default:"off" }
    this.toggleButton = undefined;
    
    this.create = function (panel, widgetOptions) {
        this.panel = panel;
        
        this.widgetObj = $(document.createElement("div"));
        this.widgetObj.addClass("panel panel-primary toggle-button");
        this.widgetObj.attr("id", this.widgetID);
        this.widgetObj.css("width", "290px").css("height", "120px").css("margin", "5px")
        
        addWidgetToolbar(this);
        setWidgetListeners(this);
        this.widgetObj.append($(document.createElement("div")).addClass("panel-body"));
        this.toggleButton = addToggleButton(this);
        this.config(widgetOptions);
        
        this.panel.panelObj.find(".widget-container").append(this.widgetObj);
        
        return this;
        
    }
    
    this.read = function () {
        
        return {"value" : (this.toggleButton.prop("checked"))?"1":"0"};
    }
    
    this.write = function () {
        //Cannot write to this widget.
        return {"error" : "cannot write to res"};
    }
    
    this.config = function (widgetOptions) {
        
        setWidgetOptions(this, widgetOptions);
        
        this.toggleButton.bootstrapToggle('destroy');
        
        this.toggleButton.bootstrapToggle({
            on : this.options.onText,
            off : this.options.offText,
            size: "large"
        });
        
        this.toggleButton.bootstrapToggle(this.options.default);
        
        this.toggleButton.change(function (event) {
            var widget = $(event.target).data("widget");
            widget.emitEvent("toggle", [widget.read()]) 
        });
        return widgetOptions;
    }
    
}

widgets["Toggle Button"] = {};
widgets["Toggle Button"].class = ToggleButtonWidget;
widgets["Toggle Button"].options = ["onText", "offText", "default"];