var graph = {elements: {}, connections: {}};

function saveElement(elem) {
    var elemID = elem.attr("id");

    graph.elements[elemID] = {}
    graph.elements[elemID].classes = elem.attr("class");
    graph.elements[elemID].position = elem.position();
    graph.elements[elemID].html = encodeURI(elem.html());
    graph.elements[elemID].next = {};
}

function saveConnection(connInfo){
    
    var newConnection = {
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
    
    graph.connections[connInfo.connection.id] = newConnection;
    
    var index = 0;
    if ($("#" + newConnection.sourceId).hasClass("function")) {
        var anchors = anchorGenerator(parseInt(functions[newConnection.sourceId].endpoints))
    
        for(var i = 0; i < anchors.length; ++i){
            if(newConnection.sourceEndpoint.y == anchors[i][1]){
                index = i;
                break;
            }
        }
    }
    graph.elements[newConnection.sourceId].next[index] = [newConnection.sourceEndpoint,newConnection.targetId];
}

function loadElements (elements, instance) { 
    
    for (var elemID in elements) {
        var elem = $(document.createElement("div"));
        var elemInfo = elements[elemID];

        elem.attr("id", elemID);
        elem.addClass(elemInfo.classes);
        $("#chart").append(elem);

        elem.css({top: elemInfo.position.top, left: elemInfo.position.left, position: "absolute"});
        elem.html(decodeURI(elemInfo.html));
        
        if(elem.hasClass("function")){
            funcInfo = functions[elemID];
        }

        configureElementDrag(elem);
        addEndpointsToElement(elem);
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

function loadResources () {
    
    for (var resID in resources) {
        console.log(resID)
        var listItem = $(document.createElement("li"));
        listItem.addClass("list-group-item");

        var res = $(document.createElement("div"));
        res.addClass("resource")
        res.html(resID);

        res.draggable({
            revert: "invalid",
            scope: "chart",
            appendTo: "#chart",
            helper: "clone"
        });

        var container = resources[resID].container;
        var type = resources[resID].type;
        var pin = resources[resID].pin;
        console.log(container)
        console.log(type)
        console.log($(".list-group." + container + "." + type))
        listItem.append(res);
        $(".list-group." + container + "." + type).append(listItem);
    }
}
