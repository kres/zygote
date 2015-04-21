function addSparkline(widget, widgetOptions) {
    
    var sparkline = c3.generate({
        bindto: $("#" + widget.widgetID + " .panel-body .chart")[0],
        data: {
            x: 'x',
            xFormat: "%H:%M:%S",
            columns: [
                ['x'],
                ['data']
            ],
            type : "line"
        },
        size : {
            height: 225,
            width: 450
        },
        axis : {
            x: {
                type: "timeseries",
                localtime: true,
                show: false,
                tick : {
                    format: "%H:%M:%S",
                    fit: true
                }
            },
            y : {
                show: false
            }
        },
        legend : {
            show : false
        },
        tooltip : {
            contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
                var contents = "<p>" + data[0].value + widget.options.units + "</p>"
                return contents;
            }
        },
        padding : {
            bottom : 20
        },
        grid : {
            focus : {
                show : false
            }
        }
        
    });
    
    return sparkline;
}

function addSparklineLabel(widget) {
    widget.label = widget.widgetObj.find(".panel-body .label");
    
    widget.label.append($(document.createElement("h3")).css("color", "#FEFEFE").addClass("sparkline-data").css("margin-top", "50px"));
    widget.label.append($(document.createElement("h5")).css("color", "#FEFEFE").addClass("sparkline-units"));
    widget.label.append($(document.createElement("br")));
    widget.label.append($(document.createElement("p")).css("color", "#FEFEFE").addClass("sparkline-timestamp"));
}
function SparklineWidget(widgetID) {
    
    $.extend(SparklineWidget.prototype, EventEmitter.prototype);
    
    this.widgetID = widgetID;
    this.id = widgetID;
    this.type = "sparkline";
    this.widgetObj = undefined;
    this.panel = undefined;
    
    this.options = {units: " °F"};
    this.sparkline = undefined;
    this.label = undefined;
    
    this.create = function (panel, widgetOptions) {
        
        this.panel = panel;
        
        var widgetWidth = 590;
        var widgetHeight = 275;
        
        this.widgetObj = $(document.createElement("div"));
        this.widgetObj.addClass("panel panel-primary sparkline");
        this.widgetObj.attr("id", this.widgetID);
        this.widgetObj.css("width", widgetWidth).css("height", widgetHeight).css("margin", "5px")
        
        addWidgetToolbar(this);
        setWidgetListeners(this);
        
        var panelWidth = (this.panel.panelObj.css("width").split("p")[0]);
        var panelHeight = (this.panel.panelObj.css("height").split("p")[0]);
        if(panelWidth < widgetWidth)
            this.panel.resizeWidth(1);
        
        this.widgetObj.append($(document.createElement("div")).addClass("panel-body"));
        this.panel.panelObj.find(".widget-container").append(this.widgetObj);
        
        this.widgetObj.find(".panel-body").append($(document.createElement("div")).addClass("chart").css("float", "right").css("width", "450px").css("height", "230px"));
        this.widgetObj.find(".panel-body").append($(document.createElement("div")).addClass("label").css("width", "140px").css("height", "230px"));
        
        addSparklineLabel(this)
        this.config(widgetOptions);
        
        return this;
        
    }
    
    this.read = function () {
        return {"error": "cannot read resource"};
    }
    
    this.write = function (data) {
        //incase it's a string, confert to number
        data.value = parseInt(data.value);
        
        var current = new Date().toLocaleTimeString().split(" ")[0]
        
        this.sparkline.flow({
            columns : [
                ['x', current],
                ['data', data.value]
            ],
            length : 0
        });
        
        this.label.find(".sparkline-data").html(data.value);
        this.label.find(".sparkline-timestamp").html(current);
        return data;
    }
    
    this.config = function (widgetOptions) {
        
        setWidgetOptions(this, widgetOptions);
        
        if(this.sparkline)
            this.sparkline = this.sparkline.destroy();
        
        this.sparkline = addSparkline(this, this.options);
        
        this.label.find(".sparkline-data").html("0");
        this.label.find(".sparkline-timestamp").html("00:00:00");
        this.label.find(".sparkline-units").html(this.options.units);
        return widgetOptions;
    }
    
}

widgets["Sparkline"] = {};
widgets["Sparkline"].class = SparklineWidget;
widgets["Sparkline"].options = ["units"];