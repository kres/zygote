function Container(containerID) {
    
    Container.prototype = $.extend(EventEmitter.prototype, {});
    
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
        addContainerModal(this);
        
        
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
        
        console.log(this.getPanels());
        //Emit event: panel-added
    }
    
    this.removePanel = function (panelID) {
        this.panels[panelID].panelObj.remove();
        delete this.panels[panelID];
        
        console.log(this.getPanels());
        //Emit event: panel-removed
    }
    
}