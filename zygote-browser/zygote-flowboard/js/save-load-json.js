var graph = {elements: {}, connections: {}};

function saveElement(elem) {
    var elemID = elem.attr("id");

    graph.elements[elemID] = {}
    graph.elements[elemID].classes = elem.attr("class");
    graph.elements[elemID].position = elem.position();
    graph.elements[elemID].html = elem.html();
}

function saveConnection(connInfo){
    
    graph.connections[connInfo.connection.id] = {
        sourceId: connInfo.sourceId, 
        targetId: connInfo.targetId,
        sourceEndpoint: { 
            x: connInfo.sourceEndpoint.anchor.x,
            y: connInfo.sourceEndpoint.anchor.y, 
            type: connInfo.sourceEndpoint.anchor.type
            //orientation: connInfo.sourceEndpoint.anchor.orientation,
            //offset: connInfo.sourceEndpoint.anchor.offsets,
            //parameters: connInfo.sourceEndpoint.getParameters()
        }, 
        targetEndpoint: { 
            x: connInfo.targetEndpoint.anchor.x,
            y: connInfo.targetEndpoint.anchor.y, 
            type: connInfo.targetEndpoint.anchor.type
            //orientation: connInfo.targetEndpoint.anchor.orientation,
            //offset: connInfo.targetEndpoint.offsets,
            //parameters: connInfo.targetEndpoint.getParameters()
        } 
    }
}
function loadElements (elements, instance) { 
    
    for (var elemID in elements) {
        var elem = $(document.createElement("div"));
        var elemInfo = elements[elemID];

        elem.attr("id", elemID);
        elem.addClass(elemInfo.classes);
        $("#chart").append(elem);

        elem.css({top: elemInfo.position.top, left: elemInfo.position.left, position: "absolute"});
        elem.html(elemInfo.html);

        configureElementDrag(elem, instance)
        addEndpointsToElement(elem, instance);
        addListenersToElement(elem);
    }
}

function loadConnections (connections, instance) {     
    
    for (var connID in connections) {
        var conn = connections[connID];
        instance.connect({
            source: conn.sourceId,
            target: conn.targetId,
            anchors: [conn.sourceEndpoint.type, conn.targetEndpoint.type]
        });

        delete graph.connections[connID];
    }
}