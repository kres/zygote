function addWidgetModal() {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Add a Widget");
    title.attr("id", "addWidgetModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body")
    modalBody.attr("id", "addWidgetModalBody");
    
    var label = $(document.createElement("label"))
    label.attr("for", "widgetID");
    label.html("Enter the widget ID: \t");
    var input = $(document.createElement("input"))
    input.attr("type", "text");
    input.attr("name", "widgetID");
    input.attr("id", "widgetID");
    
    var selectLabel = $(document.createElement("label"))
    selectLabel.attr("for", "widgetType");
    selectLabel.html("Enter the widget type: \t");
    var select = $(document.createElement("select"));
    select.attr("id", "widgetType");
    select.attr("name", "widgetType");
    
    $.each(Object.keys(widgets), function (index, value) {
        var option = $(document.createElement("option"));
        option.attr("value", value);
        option.html(value);
        select.append(option);
    });
    
    var optionsLabel = $(document.createElement("label"))
    optionsLabel.attr("for", "addWidgetOptions");
    optionsLabel.html("Enter the widget options: \t");
    var widgetOptions = $(document.createElement("textarea"));
    widgetOptions.attr("id", "addWidgetOptions");
    
    var errorAlert = $(document.createElement("div"));
    errorAlert.attr("id","widget-error-alert");
    errorAlert.addClass("alert alert-danger");
    errorAlert.css("display", "none");
    errorAlert.html("Sorry, that widget ID already exists.");
    
    modalBody.append(label).append(input).append($(document.createElement("br")))
    modalBody.append(selectLabel).append(select).append($(document.createElement("br")))
    modalBody.append(optionsLabel).append(widgetOptions);
    modalBody.append(errorAlert);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var add = $(document.createElement("button")).addClass("btn btn-primary");
    add.html("Add Widget");
    
    modalFooter.append(cancel).append(add)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "addWidgetModal");
    modal.attr("aria-labelledby", "addWidgetModalLabel");
    modal.append(modalDialog);

    $("body").append(modal);
    
    modal.modal({
        backdrop: "",
        show : false
    });
    
    add.on("click", function() {
        var panel = $("#addWidgetModal").data("trigger")
        if(Object.keys(panel.getWidgets()).indexOf($("#widgetID").val()) > -1)
            $("#widget-error-alert").show();
        else {  
            $("#widget-error-alert").hide();
            var options = $("#addWidgetOptions").val()? $("#addWidgetOptions").val():"{}";
            panel.addWidget($("#widgetID").val(), $("#widgetType").val(), JSON.parse(options));
            modal.modal('hide');
        }
    });
    
    cancel.on("click", function() {
        $("#widget-error-alert").hide();
        modal.modal('hide');
    })
    
}

function editWidgetModal() {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Edit Widget");
    title.attr("id", "editWidgetModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body")
    modalBody.attr("id", "editWidgetModalBody");
    
    var optionsLabel = $(document.createElement("label"))
    optionsLabel.attr("for", "editWidgetOptions");
    optionsLabel.html("Enter the widget options: \t");
    var widgetOptions = $(document.createElement("textarea"));
    widgetOptions.attr("id", "editWidgetOptions");
    modalBody.append(optionsLabel).append(widgetOptions);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var edit = $(document.createElement("button")).addClass("btn btn-primary");
    edit.html("Edit Widget");
    
    modalFooter.append(cancel).append(edit)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "editWidgetModal");
    modal.attr("aria-labelledby", "editWidgetModalLabel");
    modal.append(modalDialog);

    $("body").append(modal);
    
    modal.modal({
        backdrop: "",
        show : false
    });
    
    edit.on("click", function() {
        var options = $("#editWidgetOptions").val()?$("#editWidgetOptions").val():"{}" 
        ($("#editWidgetModal").data("trigger")).config(JSON.parse(options));
        modal.modal('hide');
    });
    
    cancel.on("click", function() {
        
        modal.modal('hide');
    })
    
}

function initializeDashboard() {
    addWidgetModal();
    editWidgetModal();
}