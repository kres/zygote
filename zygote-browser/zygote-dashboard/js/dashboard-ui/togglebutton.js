function addToggleButton(widgetObj) {
    var toggleButton = $(document.createElement("input"))
    toggleButton.addClass("toggle-button-widget");
    toggleButton.attr("type", "checkbox");
    toggleButton.attr("checked","checked");
    toggleButton.data("toggle","toggle")
    
    widgetObj.find(".panel-body").append(toggleButton);
    
    return toggleButton
}

function ToggleButtonWidget(widgetID) {
    
    $.extend(ToggleButtonWidget.prototype, EventEmitter.prototype);
    
    this.widgetID = widgetID;
    this.widgetObj = undefined;
    this.panel = undefined;
    
    this.data = {}
    this.options = { onText : "ON", offText: "OFF", default:"off" }
    this.toggleButton = undefined;
    
    this.create = function (panel, widgetOptions) {
        this.panel = panel;
        
        this.widgetObj = $(document.createElement("div"));
        this.widgetObj.addClass("panel panel-primary toggle-button");
        this.widgetObj.attr("id", this.widgetID);
        this.widgetObj.css("width", "290px").css("height", "120px").css("margin", "5px")
        
        addWidgetToolbar(this.widgetObj);
        setWidgetListeners(this);
        this.widgetObj.append($(document.createElement("div")).addClass("panel-body"));
        this.toggleButton = addToggleButton(this.widgetObj);
        this.config(widgetOptions);
        
        this.panel.panelObj.find(".widget-container").append(this.widgetObj);
        
        return this;
        
    }
    
    this.config = function (widgetOptions) {
        
        setWidgetOptions(this, widgetOptions);
        
        console.log(this.options)
        
        this.toggleButton.bootstrapToggle('destroy');
        
        this.toggleButton.bootstrapToggle({
            on : this.options.onText,
            off : this.options.offText,
            size: "large"
        });
        
        this.toggleButton.bootstrapToggle(this.options.default);
        
        this.toggleButton.change(function () {
            this.emitEvent("toggle", {value: this.read()})
            console.log(this.read);
        });
    
    }
    
    this.read = function () {
        
        return this.toggleButton.attr("checked");
    }
    
    this.write = function () {
        //Cannot write to this widget.
        
    }
    
}

widgets["Toggle Button"] = {};
widgets["Toggle Button"].class = ToggleButtonWidget;
widgets["Toggle Button"].options = ["onText", "offText", "default"];