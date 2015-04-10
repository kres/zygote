function getDefaultContainer() {
    var container = new Container("default");
    return container.create();
}

function addContainerToolbar(containerObj) {
    
    var toolbar = $(document.createElement("div"));
    toolbar.addClass("navbar navbar-default");
    
    var navContainer = $(document.createElement("div"));
    navContainer.addClass("container");
    
    var rfr = $(document.createElement("button")).addClass("btn btn-info navbar-btn navbar-right refresh").append($(document.createElement("span")).addClass("fa fa-refresh fa-lg"))
    var add = $(document.createElement("button")).addClass("btn btn-success navbar-btn navbar-right add").append($(document.createElement("span")).addClass("fa fa-plus fa-lg"))
    
    
    navContainer.append(rfr);
    navContainer.append(add);
   
    toolbar.append(navContainer);
    containerObj.append(toolbar);
}

function addContainerGrid(containerObj) {
    var grid = $(document.createElement("div"));
    grid.addClass("panel-container");
    
    grid.sortable();
    containerObj.append(grid);
}

function addContainerModal(container) {
    
    var modalHeader = $(document.createElement("div")).addClass("modal-header");
    var close = $(document.createElement("button"))
    close.addClass("close").data("dismiss", "modal");
    close.append($(document.createElement("span")).addClass("fa fa-remove"));
    var title = $(document.createElement("h4")).addClass("modal-title")
    title.html("Add a Panel");
    title.attr("id", "panelModalLabel")
    modalHeader.append(close).append(title);
    
    var modalBody = $(document.createElement("div")).addClass("modal-body");
    var label = $(document.createElement("label"))
    label.attr("for", "panelID");
    label.html("Enter the panel ID: <br>");
    var input = $(document.createElement("input"))
    input.attr("type", "text");
    input.attr("name", "panelID");
    input.attr("id", "panelID");
    modalBody.append(label).append(input);
    
    var modalFooter = $(document.createElement("div")).addClass("modal-footer");
    var cancel = $(document.createElement("button"))
    cancel.addClass("btn btn-default").data("dismiss","modal");
    cancel.html("Cancel");
    var add = $(document.createElement("button")).addClass("btn btn-primary")
    add.html("Add Panel");
    
    modalFooter.append(cancel).append(add)
    
    var modalContent = $(document.createElement("div")).addClass("modal-content");
    modalContent.append(modalHeader).append(modalBody).append(modalFooter);
    
    var modalDialog = $(document.createElement("div")).addClass("modal-dialog");
    modalDialog.append(modalContent);
    
    var modal = $(document.createElement("div")).addClass("modal fade")
    modal.attr("role", "dialog")
    modal.attr("id", "addPanelModal");
    modal.attr("aria-labelledby", "panelModalLabel");
    modal.append(modalDialog);

    container.containerObj.append(modal);
    modal.modal({
        backdrop: "",
        show : false
    });
    
    add.on("click", function() {
        container.addPanel($("#panelID").val());
        modal.modal('hide');
    })
    
}

function setContainerListeners(container) {
    container.containerObj.find(".btn.add").on("click", function () {
        console.log("Adding panel...")
        container.containerObj.find("#addPanelModal").modal('show');
    });
}

function addPanelToolbar(panelObj) {
    var toolbar = $(document.createElement("div"));
    toolbar.addClass("panel-heading");
    
    var rfr = $(document.createElement("button")).addClass("btn btn-info panel-btn refresh").append($(document.createElement("span")).addClass("fa fa-refresh fa-lg"));
    var rmv = $(document.createElement("button")).addClass("btn btn-danger panel-btn remove").append($(document.createElement("span")).addClass("fa fa-remove fa-lg"));
    var add = $(document.createElement("button")).addClass("btn btn-success panel-btn add").append($(document.createElement("span")).addClass("fa fa-plus fa-lg"));
    
    toolbar.append(rfr)
    toolbar.append(rmv)
    toolbar.append(add)
    panelObj.append(toolbar);
    
}

function addPanelGrid(panelObj) {
    var grid = $(document.createElement("div"));
    grid.addClass("widget-container");
    
    grid.sortable();
    panelObj.append(grid);
}

function setPanelListeners(panel) {
    panel.panelObj.find(".btn.add").on("click", function () {
        panel.addWidget();
    });
    
    panel.panelObj.find(".btn.remove").on("click", function () {
        panel.container.removePanel(panel.panelID);
    });                                       
}

function addPanelModal(panel) {
    
}