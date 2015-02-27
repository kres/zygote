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
        alert("Workspace Cleared.");
    }
    
    function exportJSON() {
        localStorage.setItem("flow",JSON.stringify(graph));
        alert("Flow Exported.");
    }
    
    function importJSON() {
        clearWorkspace();
        graph = JSON.parse(localStorage.getItem("flow"))
        
        loadElements(graph.elements, instance);
        loadConnections(graph.connections, instance)
        
        alert($("#chart")[0].outerHTML);
        alert("Flow Loaded");
    }
    
    //Making the blocks on the palette draggable to the workspace.
    $(".block").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    //Making the resources draggable to the workspace.
    $(".resource").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone",
    });
    
    $(".flow").draggable({
        scope: "chart",
        appendTo: "#chart",
        stop: function(e,ui) {
            graph.elements[ui.helper.attr("id")].position = ui.position;
        }
    });

    //Making the chart (the white area of the workspace) a droppable area. 
    //On drop, add the element to the chart, remove jQuery drag configure with jsPlumb capabilities.
    $("#chart").droppable({
        scope: "chart",
        drop: function(e, ui) {
                var elem = $(ui.helper).clone();
                $(this).append(elem);
                configureElement(elem,instance);       
        }
    });
    
    instance.bind("connection", function(info, e) {
        saveConnection(info);
    });
    
    instance.bind("connectionDetached", function(info, e) {
        delete graph.connections[info.connection.id];
    });
    
    $("#chart").on("mouseover",setJSON);
    $("#importButton").on("click", importJSON);
    $("#exportButton").on("click", exportJSON);
    $("#clearButton").on("click", clearWorkspace);
    
});
