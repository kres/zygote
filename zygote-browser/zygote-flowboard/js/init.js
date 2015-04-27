jsPlumb.ready(function () {
    
    var instance = jsPlumb.getInstance({
        DragOptions : { cursor: 'pointer', zIndex: 2000 },
        PaintStyle : { strokeStyle: '#000' },
        HoverPaintStyle: { strokeStyle: "#888" },
        EndpointStyle : { radius: 5, fillStyle: "#000" },
        EndpointHoverStyle: { fillStyle: "#888" },
        Endpoint : "Dot",
        Container:"chart"
    });
    
    
    function clearWorkspace() {
        jsPlumb.reset();
        $("#chart").empty();
        graph = {elements: {}, connections: {}};
        functions = {};
        alert("Workspace Cleared.");
    }
    
    function refreshResources() {
        clearPalette();
        initializePalette();
    }
    
    function exportJSON() {
        
    }
    
    function importJSON() {
    
    }

    $(".start").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    $(".stop").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    $(".function").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    //Making the chart (the white area of the workspace) a droppable area. 
    //On drop, add the element to the chart, remove jQuery drag configure with jsPlumb capabilities.
    $("#chart").droppable({
        scope: "chart",
        drop: function(e, ui) {
                var elem = $(ui.helper).clone();
                $(this).append(elem);
                $("body").data("instance",instance);
                configureElement(elem);       
        }
    });
    
    instance.bind("connection", function(info, e) {
        saveConnection(info);
    });
    
    instance.bind("connectionDetached", function(info, e) {
        
        delete graph.elements[info.sourceId].next[info.sourceEndpoint.y];
        delete graph.connections[info.connection.id];
    });
    
    resourceDialog = $("#resource-dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Create Resource": addResource,
            Cancel: function() {
                resourceDialog.dialog("close");
            }
        },
        close: function() {
            document.forms[0].reset();
        }
    })
    
    resourceForm = resourceDialog.find( "#resource-form" ).on( "submit", function( event ) {
      event.preventDefault();
      addResource();
    });
    
    functionDialog = $("#function-dialog").dialog({
        autoOpen: false,
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "Done": addFunction,
            Cancel: function() {
                $("#function-dialog").dialog("close");
            }
        },
        open: function() {
            console.log("Open");
            loadFunctionParams();
        },
        close: function() {
            document.forms[1].reset();
        }
    });

    functionForm = functionDialog.find( "#function-form" ).on( "submit", function( event ) {
      event.preventDefault();
      addFunction();
    });
    
   triggerDialog = $("#trigger-dialog").dialog({
        autoOpen: false,
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "Done": setTrigger,
            Cancel: function() {
                $("#function-dialog").dialog("close");
            }
        },
        open: function() {
            console.log("Open");
            setTriggerFormOptions();
        },
        close: function() {
            document.forms[2].reset();
        }
    });

    triggerForm = triggerDialog.find( "#trigger-form" ).on( "submit", function( event ) {
      event.preventDefault();
      setTrigger();
    });

    
    initializePalette();
    
    $("#chart").on("mouseover",setJSON);
    $("#refreshButton").on("click", refreshResources);
    $("#importButton").on("click", importJSON);
    $("#exportButton").on("click", exportJSON);
    $("#clearButton").on("click", clearWorkspace);
    $("#addButton").on("click", function() {
        setFormOptions();
        resourceDialog.dialog("open");
    })
    
});
