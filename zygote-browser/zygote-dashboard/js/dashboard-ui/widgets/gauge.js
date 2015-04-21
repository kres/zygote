function addGauge(widget, widgetOptions) {
    
    var gauge = c3.generate({
        bindto : $("#" + widget.widgetID + " .panel-body")[0],
        data: {
            columns: [
                ['data', widget.data.value]
            ],
            type: 'gauge',
            
        },
        onmouseover: function() {},
        onmouseout: function() {},
        
        gauge: {
            label: {
                format: function(value, ratio) {
                    return value;
                },
                show: true
            },
            min: widgetOptions.min, 
            max: widgetOptions.max,
            units: widgetOptions.units,
            width: 40,
            expand: false
        },
        color: {
            pattern: ['#77CB77', '#73C9E2', '#FAA022', '#EC4E4A'], 
            threshold: {
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height : 200
        },
        tooltip: {
            show: false
        }
    });
    
    $(".c3-chart-arcs-background").css("fill", "#000").css("stroke", "none");
    $(".c3-arc-data").css("stroke", "none");
    $(".c3-chart-arcs-gauge-min").css("font-size", "10").css("fill", "#FEFEFE");
    $(".c3-chart-arcs-gauge-max").css("font-size", "10").css("fill", "#FEFEFE");
    $(".c3-chart-arcs-gauge-unit").css("font-size", "10").css("fill", "#FEFEFE");
    $(".c3-chart-arc text").css("fill", "#FEFEFE");
    
    return gauge;
   
}

function GaugeWidget(widgetID) {
    
    $.extend(GaugeWidget.prototype, EventEmitter.prototype);
    
    this.widgetID = widgetID;
    this.id = widgetID;
    this.type = "gauge";
    this.widgetObj = undefined;
    this.panel = undefined;
    
    this.data = {value: 63};
    this.options = {min: "0", max: "100", units: " %"}
    this.gauge= undefined;
    
    this.create = function (panel, widgetOptions) {
        
        this.panel = panel;
        
        this.widgetObj = $(document.createElement("div"));
        this.widgetObj.addClass("panel panel-primary gauge");
        this.widgetObj.attr("id", this.widgetID);
        this.widgetObj.css("width", "290px").css("height", "290px").css("margin", "5px")
        
        addWidgetToolbar(this);
        setWidgetListeners(this);
        
        this.widgetObj.append($(document.createElement("div")).addClass("panel-body"));
        this.panel.panelObj.find(".widget-container").append(this.widgetObj);
        
        this.config(widgetOptions);
        
        
        
        return this;
        
    }
    
    this.read = function () {
        return {"error" : "cannot read res"};
    }
    
    this.write = function (data) {
        //incase it's a string, confert to number
        data.value = parseInt(data.value);
        this.gauge.load({
            columns: [['data', data.value]]
        });
        
        this.data = data;
        return data;
    }
    
    this.config = function (widgetOptions) {
        
        setWidgetOptions(this, widgetOptions);
        
        if(this.gauge)
            this.gauge = this.gauge.destroy();
        
        this.gauge = addGauge(this, this.options);
        
        return widgetOptions;   
    }
    
}

widgets["Gauge"] = {};
widgets["Gauge"].class = GaugeWidget;
widgets["Gauge"].options = ["min", "max", "units"];