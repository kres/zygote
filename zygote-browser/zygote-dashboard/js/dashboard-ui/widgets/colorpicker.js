function changePreviewColor(widget) {
    var rgb = widget.read().value;
    widget.widgetObj.find(".preview").css("background-color", "rgb("+rgb.r+","+rgb.g+","+rgb.b+")");
}

function colorPickerSlide (event) {
    changePreviewColor($(event.target).data("widget"));
}

function colorPickerChange (event) {
    var widget = $(event.target).data("widget");
    changePreviewColor(widget);
    widget.emitEvent("color-change", [widget.read()]);
}


function addColorPicker(widget) {
    var sliderContainer = $(document.createElement("div"));
    sliderContainer.addClass("slider-container");
    
    widget.colorPicker.r = $(document.createElement("div")).addClass("r")
    widget.colorPicker.r.data("widget", widget);
    widget.colorPicker.g = $(document.createElement("div")).addClass("g")
    widget.colorPicker.g.data("widget", widget);
    widget.colorPicker.b = $(document.createElement("div")).addClass("b")
    widget.colorPicker.b.data("widget", widget);
    
    sliderContainer.append(widget.colorPicker.r).append(widget.colorPicker.g).append(widget.colorPicker.b);
    
    var colorPreviewContainer = $(document.createElement("div"));
    colorPreviewContainer.addClass("preview-container");
    
    colorPreviewContainer.append($(document.createElement("div")).addClass("preview"))
    
    widget.widgetObj.find(".panel-body").append(sliderContainer).append(colorPreviewContainer);
    
    widget.colorPicker.r.slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value : 127,
        change : colorPickerChange,
        slide : colorPickerSlide
    });
    
    widget.colorPicker.g.slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value : 127,
        change : colorPickerChange,
        slide : colorPickerSlide
    });
    
    widget.colorPicker.b.slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value : 127,
        change : colorPickerChange,
        slide : colorPickerSlide
    });
    
}

function ColorPickerWidget(widgetID) {
    
    $.extend(ColorPickerWidget.prototype, EventEmitter.prototype);
    
    this.widgetID = widgetID;
    this.id = widgetID;
    this.type = "colorPicker";
    this.widgetObj = undefined;
    this.panel = undefined;
    
    this.options = {};
    this.colorPicker = {r:undefined,g:undefined,b:undefined};
    
    this.create = function (panel, widgetOptions) {
        this.panel = panel;
        
        var widgetWidth = 590;
        var widgetHeight = 290;
        
        this.widgetObj = $(document.createElement("div"));
        this.widgetObj.addClass("panel panel-primary color-picker");
        this.widgetObj.attr("id", this.widgetID);
        this.widgetObj.css("width", widgetWidth).css("height", widgetHeight).css("margin", "5px")
        
        addWidgetToolbar(this);
        setWidgetListeners(this);
        
        this.widgetObj.append($(document.createElement("div")).addClass("panel-body"));
        
        var panelWidth = (this.panel.panelObj.css("width").split("p")[0]);
        var panelHeight = (this.panel.panelObj.css("height").split("p")[0]);
        if(panelWidth < widgetWidth)
            this.panel.resizeWidth(1);
        this.panel.panelObj.find(".widget-container").append(this.widgetObj);
        
        addColorPicker(this);
        
        return this;
        
    }
    
    this.read = function () {
        
        var value = {};
        value.r = this.colorPicker.r.slider("value");
        value.g = this.colorPicker.g.slider("value");
        value.b = this.colorPicker.b.slider("value");
        
        return {value: value};
    }
    
    this.write = function () {
        return {"error" : "cannot write to res"};
    }
    
    this.config = function (widgetOptions) {
         return {"error" : "cannot config res"};
    }
    
}

widgets["Color Picker"] = {};
widgets["Color Picker"].class = ColorPickerWidget;
widgets["Color Picker"].options = [];