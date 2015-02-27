function setInfoText() {
    $("#element-info").html("<p>The element was selected<p>");
}

function setJSON() {
    $("#json-flow").html(JSON.stringify(graph));
}

function configureElementDrag(elem, instance) {
    
    elem.removeClass("ui-draggable ui-draggable-handle ui-draggable-dragging");
    
    //Configure element with jsPlumb drag.
    instance.draggable(elem, {
        containment: "parent",
        stop: function(e,ui) {
            graph.elements[ui.helper.attr("id")].position = ui.position;
        }
    });
    
}

function addEndpointsToElement(elem,instance) {

    if(elem.hasClass("block")) {
            instance.addEndpoint(elem, { isSource:true, isTarget:true, anchor:"Left" });
            instance.addEndpoint(elem, { isSource:true, isTarget:true, anchor:"Right" });
        }
        else if (elem.hasClass("resource")) {
            instance.addEndpoint(elem, { isSource:true, isTarget:true, anchor:"Top" });
            instance.addEndpoint(elem, { isSource:true, isTarget:true, anchor:"Bottom" });
        }
}

function addListenersToElement(elem) {
    elem.on("click", setInfoText);
}

function configureElement(elem, instance) {

    elem.uniqueId();

    configureElementDrag(elem, instance)
    //Add to the graph data, to be saved as JSON.    
    saveElement(elem);

    //Add endpoints to element only after being dragged to workspace.
    addEndpointsToElement(elem, instance);
    addListenersToElement(elem);
}