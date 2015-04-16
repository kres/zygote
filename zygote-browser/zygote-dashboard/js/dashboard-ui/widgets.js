//An object to store the different widgets, their classes.
var widgets = {};

function addWidgetToolbar(widget) {
    
    var toolbar = $(document.createElement("div"));
    toolbar.addClass("panel-heading widget-toolbar");
    
    var name =  $(document.createElement("h6")).addClass("widget-name").html(widget.widgetID);
    var rmv = $(document.createElement("button")).addClass("btn btn-danger widget-btn btn-xs remove").append($(document.createElement("span")).addClass("fa fa-remove"));
    var edit = $(document.createElement("button")).addClass("btn btn-warning widget-btn btn-xs edit").append($(document.createElement("span")).addClass("fa fa-edit"));
    
    toolbar.append(name);
    toolbar.append(rmv)
    toolbar.append(edit)
    widget.widgetObj.append(toolbar);
}

function setWidgetListeners(widget) {
    widget.widgetObj.find(".remove").on("click", function () {
        widget.panel.removeWidget(widget.widgetID);
    });
    widget.widgetObj.find(".edit").on("click", function () {
         $("#editWidgetModal").data("trigger", widget);
        $("#editWidgetModal").modal('show');
    });
}

function setWidgetOptions(widget, widgetOptions) {
    for (key in widget.options) {
        if (widgetOptions[key] != undefined)
            widget.options[key] = widgetOptions[key];
    }
}

