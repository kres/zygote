var meta;
var containers = [];
var specs = {};
var resources = {};
var functions = {}


function setInfoText() {
    $("#element-info").html("<p>The element was selected<p>");
}

function getJSONData() {
    return {
        graph: graph,
        resources: resources,
        functions: functions
    }
}
function setJSON() {
    $("#json-flow").html(JSON.stringify(getJSONData()));
}

function configureElementDrag(elem) {
    
    var instance = $("body").data("instance");
    elem.removeClass("ui-draggable ui-draggable-handle ui-draggable-dragging");
    
    //Configure element with jsPlumb drag.
    instance.draggable(elem, {
        containment: "parent",
        stop: function(e,ui) {
            graph.elements[ui.helper.attr("id")].position = ui.position;
            console.log(ui.helper[0].outerHTML);
            console.log(instance.selectEndpoints({source: ui.helper.attr("id")}).getParameters()[0][1].anchor)
        }
    });
    
}

function anchorGenerator(count) {
    console.log("Here");
    switch (count) {
            case 1: return [[1,0.5,1,0]];
                    break;
            case 2: return [[1,0.25,1,0],[1,0.75,1,0]];
                    break;
            case 3: return [[1,0.25,1,0],[1,0.5,1,0],[1,0.75,1,0]];
                    break;
            case 4: return [[1,0.2,1,0],[1,0.4,1,0],[1,0.6,1,0],[1,0.8,1,0]];
                    break;
    }
}
function editFunctionEndpoints(elem) {
    
    var instance = $("body").data("instance");
    var func = functions[elem.attr("id")];
    
    var existing = instance.selectEndpoints({source: elem.attr("id")}).length
    console.log(existing);
    console.log(typeof(func.endpoints));
    
    var eps = parseInt(func.endpoints)
    var anchors = anchorGenerator(eps);
    console.log(anchors)
    if(existing < eps) {
        for (var i = 0; i < existing; ++i) {
            var ep = instance.selectEndpoints({source: elem.attr("id")}).get(i);
            console.log(anchors[i])
            ep.setAnchor(anchors[i])
            console.log(ep)
        }
        for (var i = existing; i < eps; ++i) {
            var ep = instance.addEndpoint(elem, { isSource:true, isTarget:false, anchor:anchors[i] });
            console.log(ep)
        }
    }
    else if (existing > eps) {
        for (var i = 0 ; i< eps; ++i) {
            var ep = instance.selectEndpoints({source: elem.attr("id")}).get(i);
            console.log(anchors[i])
            ep.setAnchor(anchors[i])
            console.log(ep)
        }
        
        for (var i = eps ; i< existing; ++i) {
            var ep = instance.selectEndpoints({source: elem.attr("id")}).get(eps);
            console.log(ep)
            instance.deleteEndpoint(ep);
        }
    }
    
}

function addEndpointsToElement(elem) {

    var instance = $("body").data("instance");
    
    if((elem.hasClass("resource")) || (elem.hasClass("function"))){
        instance.addEndpoint(elem, { isSource:false, isTarget:true, anchor:"Left" });
        instance.addEndpoint(elem, { isSource:true, isTarget:false, anchor:"Right" });
        
        if(functions[elem.attr("id")] != undefined) {
            editFunctionEndpoints(elem);
        }
    }
    else if (elem.hasClass("start")) {
        instance.addEndpoint(elem, { isSource:true, isTarget:false, anchor:"Right" });
    }
    else if (elem.hasClass("stop")) {
        instance.addEndpoint(elem, { isSource:false, isTarget:true, anchor:"Left" });
    }
}

function addListenersToElement(elem) {
    elem.on("click", setInfoText);
    if (elem.hasClass("function")){
        elem.on("click", function() {
            functionDialog.data("opener",elem);
            functionDialog.dialog("open");
        });
    }
    if (elem.hasClass("start")){
        elem.children().on("click", function() {
            generateScript(elem);
        });
    }
}

function configureElement(elem) {

    elem.uniqueId();
    var instance = $("body").data("instance");
    
    if((!elem.hasClass("start")) && (!elem.hasClass("stop")))
        configureElementDrag(elem);
    
    //Add to the graph data, to be saved as JSON.    
    saveElement(elem);

    //Add endpoints to element only after being dragged to workspace.
    addEndpointsToElement(elem);
    addListenersToElement(elem);
    
    if(elem.hasClass("function")) {
        functionDialog.data("opener",elem);
        functionDialog.dialog("open");
    }
}

function createBlock(containerName) {
    
    var panel = $(document.createElement("div"));
    panel.addClass("block panel panel-default");
    panel.attr("id", containerName + "-block");
    
    var heading = $(document.createElement("div"));
    heading.addClass("panel-heading");
    heading.html(containerName);
    
    panel.append(heading);
    console.log(panel);
    panel.appendTo($("#palette"));
    
}

function createResourceType(resourceType, container){
    var panel = $(document.createElement("div"));
    panel.addClass("res-type panel panel-default");
    
    var heading = $(document.createElement("div"));
    heading.addClass("panel-heading");
    heading.html(resourceType);
    
    var ulist =$(document.createElement("ul"));
    ulist.addClass("list-group " + container + " " + resourceType);
    
    panel.append(heading);
    panel.append(ulist);
    panel.appendTo($("#" + container + "-block"));
    
}
function setFormOptions() {
    
    $("#container-select").empty()
    $.each(containers, function(index, value) {
        option = $(document.createElement("option"));
        option.attr("value", value);
        option.html(value);
        $("#container-select").append(option);
    });
    
    var container = containers[0];
    console.log(container);
    console.log(JSON.stringify(specs))
    $("#type-select").empty()
    $.each(Object.keys(specs[container].res), function(index, value){
            option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#type-select").append(option);
    });
    
    var type = Object.keys(specs[container].res)[0]
    $("#pin-select").empty()
    $.each(Object.keys(specs[container].res[type]), function(index, value){
             option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#pin-select").append(option);
    });
    
    $("#container-select").change(function() {
        container = $(this).val();
        
        $("#type-select").empty()
        $.each(Object.keys(specs[container].res), function(index, value){
             option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#type-select").append(option);
        });
        
        $("#type-select").change(function() {
            var container = $("#container-select").val();
            var type = $(this).val();
        
            $("#pin-select").empty()
            $.each(Object.keys(specs[container].res[type]), function(index, value){
                option = $(document.createElement("option"));
                option.attr("value", value);
                option.html(value);
                $("#pin-select").append(option);
            });
        });
    });
    
}

function addResource() {
    
    var listItem = $(document.createElement("li"));
    listItem.addClass("list-group-item");
    
    var res = $(document.createElement("div"));
    res.addClass("resource")
    res.html($("#name").val());
    
    res.draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    var container = $("#container-select").val();
    var type = $("#type-select").val();
    var pin = $("#pin-select").val();
    
    listItem.append(res);
    $(".list-group." + container + "." + type).append(listItem);
    
    resources[$("#name").val()] = {
        container: container,
        type: type,
        pin: pin
    }
    
    resourceDialog.dialog("close");
    
}

function loadFunctionParams() {
    
    var id = functionDialog.data("opener").attr("id");
    if(functions[id] != undefined) {
        $("#fname").val(functions[id].name);
        $("#fendpoints").val(functions[id].endpoints);
        $("#fdef").val(functions[id].definition);
    }
    
}

function addFunction() {

    var name = $("#fname").val();
    var endpoints = $("#fendpoints").val();
    var definition = $("#fdef").val();
    
    functions[functionDialog.data("opener").attr("id")] = {
        name: name,
        endpoints: endpoints,
        definition: definition
    }
    
    editFunctionEndpoints(functionDialog.data("opener"));
    
    functionDialog.data("opener").html(name);
    functionDialog.dialog("close"); 
}

function clearPalette() {
    $("#palette").html('<div class="panel panel-default"><ul class="list-group"><li class="list-group-item"><div class="start"><div class="init"></div></div></li>' + 
                       '<li class="list-group-item"><div class="stop"></div></li><li class="list-group-item"><div class="function">Function</div></li></ul></div>');
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
}

function initializePalette() {
    $.getJSON("../res/containers.txt", function(data) {
        containers = data.containers;
        console.log(containers)
        
        specs = {};
        $.each(containers, function(index, containervalue){
            createBlock(containervalue);
            
            $.getJSON("../res/specsample-" + containervalue + ".txt", function(data) {
                specs[containervalue] = data;
                
                $.each(Object.keys(specs[containervalue].res), function(index, value) {
                    createResourceType(value,containervalue)
                })
            })
        });
    });
}
