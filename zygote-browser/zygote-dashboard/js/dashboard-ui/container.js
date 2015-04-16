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

function addPanelModal(container) {
    
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
    
    var errorAlert = $(document.createElement("div"));
    errorAlert.attr("id","panel-error-alert");
    errorAlert.addClass("alert alert-danger");
    errorAlert.css("display", "none");
    errorAlert.html("Sorry, that panel ID already exists.");
    
    modalBody.append(label).append(input).append(errorAlert);
    
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
        if(Object.keys(container.getPanels()).indexOf($("#panelID").val()) > -1)
            $("#panel-error-alert").show();
        else {
            container.addPanel($("#panelID").val());
            $("#panel-error-alert").hide();
            modal.modal('hide');
        }
    });
    
    cancel.on("click", function() {
        $("#panel-error-alert").hide();
        modal.modal('hide');
    });
}

function setContainerListeners(container) {
    container.containerObj.find(".btn.add").on("click", function () {
        container.containerObj.find("#addPanelModal").modal('show');
    });
}

function Container(containerID) {
    
    $.extend(Container.prototype, EventEmitter.prototype);
    
    this.panels = {};
    this.containerObj = undefined;
    this.containerID = containerID;
    
    this.create = function() {
        
        this.containerObj = $(document.createElement("div"));
        this.containerObj.addClass("container-main");
        this.containerObj.attr("id",this.containerID);
        
        //Create a menu/toolbar.
        addContainerToolbar(this.containerObj);
        setContainerListeners(this);
        //Create the grid to add panels.
        addContainerGrid(this.containerObj);
        //Create a modal form for adding panels.
        addPanelModal(this);
        
        
        $("body").append(this.containerObj);
        
        return this;
    }
    
    this.getPanels = function () { 
        return this.panels;
    }
    
    this.getPanel = function (panelID) {
        return this.panels[panelID]
    }
    
    this.addPanel = function (panelID) {
        var panel = new Panel(panelID);
        this.panels[panelID] = panel.create(this);
        
        //Emit event: panel-added
        this.emitEvent("panel-added", [panel]);
        
    }
    
    this.removePanel = function (panelID) {
        //Emit event: panel-removed
        this.emitEvent("panel-removed", [this.panels[panelID]]);
        
        this.panels[panelID].panelObj.remove();
        delete this.panels[panelID];
        
    }
    
}