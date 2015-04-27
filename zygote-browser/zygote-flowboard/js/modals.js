function createResourceModal() {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Create Resource");
    title.attr("id", "createResourceModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body")
    modalBody.attr("id", "createResourceModalBody");
    
    var resourceForm = $(document.createElement("form"));
    resourceForm.attr("id", "resource-form");
    
    var nameLabel = $(document.createElement("label")).attr("for", "name");
    nameLabel.html("Resource Name: ")
    var nameInput = $(document.createElement("input")).attr("id", "name").attr("name", "name").attr("type", "text");
    var containerLabel = $(document.createElement("label")).attr("for", "container-select");
    containerLabel.html("Container: ");
    var containerSelect = $(document.createElement("select")).attr("id", "container-select").attr("name", "container-select");
    var typeLabel = $(document.createElement("label")).attr("for", "type-select");
    typeLabel.html("Type: ");
    var typeSelect = $(document.createElement("select")).attr("id", "type-select").attr("name", "type-select");
    var pinLabel = $(document.createElement("label")).attr("for", "pin-select");
    pinLabel.html("Pin: ");
    var pinSelect = $(document.createElement("select")).attr("id", "pin-select").attr("name", "pin-select");
    
    
    var custom = $(document.createElement("input")).attr("id", "custom-pin").attr("name", "custom-pin").attr("type", "checkbox");
    var customLabel = $(document.createElement("label")).attr("for", "custom-pin-value");
    customLabel.html("Custom Pin: ");
    var customValue = $(document.createElement("input")).attr("id", "custom-pin-value").attr("name", "custom-pin-value");
    
    
    resourceForm.append(nameLabel).append(nameInput).append($(document.createElement("br")));
    resourceForm.append(containerLabel).append(containerSelect).append($(document.createElement("br")));
    resourceForm.append(typeLabel).append(typeSelect).append($(document.createElement("br")));
    resourceForm.append(pinLabel).append(pinSelect).append($(document.createElement("br")));
    resourceForm.append(custom).append(customLabel).append(customValue);
    modalBody.append(resourceForm);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var create = $(document.createElement("button")).addClass("btn btn-primary");
    create.html("Create Resource");
    
    modalFooter.append(cancel).append(create)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "createResourceModal");
    modal.attr("aria-labelledby", "createResourceModalLabel");
    modal.append(modalDialog);

    $("#palette").append(modal);
    
    modal.modal({
        backdrop: false,
        show : false
    });
    
    create.on("click", function() {
        addResource();
        modal.modal('hide');
        document.forms[0].reset();
    });
    
    cancel.on("click", function() {
        modal.modal('hide');
        document.forms[0].reset();
    });
    
    return modal;
    
}

function editFunctionModal() {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Edit Function");
    title.attr("id", "editFunctionModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body")
    modalBody.attr("id", "editFunctionModalBody");
    
    var functionForm = $(document.createElement("form"));
    functionForm.attr("id", "function-form");
    
    var nameLabel = $(document.createElement("label")).attr("for", "fname");
    nameLabel.html("Function Name: ")
    var nameInput = $(document.createElement("input")).attr("id", "fname").attr("name", "fname").attr("type", "text");
    var endpointLabel = $(document.createElement("label")).attr("for", "fendpoints");
    endpointLabel.html("Endpoints: ");
    var endpointSelect = $(document.createElement("input")).attr("id", "fendpoints").attr("name", "fendpoints").attr("type", "number");
    
    var defTextArea = $(document.createElement("textarea")).attr("id", "fdef").attr("name", "fdef");
    defTextArea.attr("form","function-form").attr("rows", "10").attr("cols", "50");
   
    functionForm.append(nameLabel).append(nameInput).append($(document.createElement("br")));
    functionForm.append(endpointLabel).append(endpointSelect).append($(document.createElement("br")));
    functionForm.append(defTextArea);
    
    modalBody.append(functionForm);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var edit = $(document.createElement("button")).addClass("btn btn-primary");
    edit.html("Edit Function");
    
    modalFooter.append(cancel).append(edit)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "editFunctionModal");
    modal.attr("aria-labelledby", "editFunctionModalLabel");
    modal.append(modalDialog);

    $("#palette").append(modal);
    
    modal.modal({
        backdrop: false,
        show : false
    });
    
    edit.on("click", function() {
        addFunction();
        document.forms[0].reset();
        modal.modal('hide');
    });
    
    cancel.on("click", function() {
        document.forms[0].reset();
        modal.modal('hide');
    });
    
    return modal;
    
}

function setTriggerModal() {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Set Flow Trigger");
    title.attr("id", "setTriggerModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body")
    modalBody.attr("id", "setTriggerModalBody");
    
    var triggerForm = $(document.createElement("form"));
    triggerForm.attr("id", "trigger-form");
    
    var nameLabel = $(document.createElement("label")).attr("for", "flowname");
    nameLabel.html("Flow Name: ")
    var nameInput = $(document.createElement("input")).attr("id", "flowname").attr("name", "flowname").attr("type", "text");
    var typeLabel = $(document.createElement("label")).attr("for", "trigger-type");
    typeLabel.html("Type: ");
    var typeSelect = $(document.createElement("select")).attr("id", "trigger-type").attr("name", "trigger-type");
    
    var option1 = $(document.createElement("option")).attr("value", "timer").html("Timer");
    var option2 = $(document.createElement("option")).attr("value", "event").html("Event");
    var option3 = $(document.createElement("option")).attr("value", "dashboard-event").html("Dashboard Event");
    
    typeSelect.append(option1).append(option2).append(option3);
    
    triggerForm.append(nameLabel).append(nameInput).append($(document.createElement("br")));
    triggerForm.append(typeLabel).append(typeSelect).append($(document.createElement("br")));
    
    modalBody.append(triggerForm);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var set = $(document.createElement("button")).addClass("btn btn-primary");
    set.html("Set Flow Trigger");
    
    modalFooter.append(cancel).append(set)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "setTriggerModal");
    modal.attr("aria-labelledby", "setTriggerModalLabel");
    modal.append(modalDialog);

    $("#palette").append(modal);
    
    modal.modal({
        backdrop: false,
        show : false
    });
    
    set.on("click", function() {
        setTrigger();
        modal.modal('hide');
        document.forms[2].reset();
    });
    
    cancel.on("click", function() {
        modal.modal('hide');
        document.forms[2].reset();
    });
    
    return modal;
    
}