var meta;
var containers = [];
var specs = {};
var resources = {};
var functions = {};
var triggers = {};

function setInfoText() {
    $("#element-info").html("<p>The element was selected<p>");
}

function getJSONData() {
    return {
        graph: graph,
        resources: resources,
        functions: functions,
        triggers: triggers
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
    console.log(func);
    var existing = instance.selectEndpoints({source: elem.attr("id")}).length
    console.log(existing);
    
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
        elem.children().on("click", function(event) {
            generateScript(elem);
            event.stopPropagation();
        });
        
        elem.on("click", function() {
            triggerDialog.data("opener", elem);
            triggerDialog.dialog("open");
        })
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
    
    if (elem.hasClass("start")){
        triggerDialog.data("opener", elem);
        triggerDialog.dialog("open");
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
    
    $("#type-select").empty()
    $.each(Object.keys(specs[container].res), function(index, value){
            option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#type-select").append(option);
    });
    
    var type = Object.keys(specs[container].res)[0]
    console.log(type);
    
    $("#pin-select").empty()
    
    if(Object.keys(specs[container].res[type]).indexOf("service") >= 0) {
        var serviceName = specs[container].res[type].service;
        
        $.each(specs[container].service[serviceName], function (index, value){
            option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#pin-select").append(option);
        });
    }
    else {
        $.each(Object.keys(specs[container].res[type].ep), function(index, value){
                option = $(document.createElement("option"));
                option.attr("value", value);
                option.html(value);
                $("#pin-select").append(option);
        });
    }
    
    $("#container-select").change(function() {
        container = $(this).val();
        console.log(container);
        
        $("#type-select").empty()
        
        $.each(Object.keys(specs[container].res), function(index, value){
            option = $(document.createElement("option"));
            option.attr("value", value);
            option.html(value);
            $("#type-select").append(option);
        });
        
        var type = Object.keys(specs[container].res)[0]
        $("#pin-select").empty()

        if(Object.keys(specs[container].res[type]).indexOf("service") >= 0) {
            var serviceName = specs[container].res[type].service;

            $.each(specs[container].service[serviceName], function (index, value){
                option = $(document.createElement("option"));
                option.attr("value", value);
                option.html(value);
                $("#pin-select").append(option);
            });
        }
        else {
            $.each(Object.keys(specs[container].res[type].ep), function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    $("#pin-select").append(option);
            });
        }
    });
    
    $("#type-select").change(function() {
        var container = $("#container-select").val();
        var type = $(this).val();
        
        console.log(container);
        console.log(type);

        $("#pin-select").empty()

        if(Object.keys(specs[container].res[type]).indexOf("service") >= 0) {
            var serviceName = specs[container].res[type].service;
            console.log(serviceName);
            console.log(specs[container].service[serviceName])

            $.each(specs[container].service[serviceName], function (index, value){
                option = $(document.createElement("option"));
                option.attr("value", value);
                option.html(value);
                $("#pin-select").append(option);
            });
        }
        else {
            $.each(Object.keys(specs[container].res[type].ep), function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    $("#pin-select").append(option);
            });
        }

    });
    
}

function setTriggerFormOptions() {
    
    console.log(triggerDialog.data("opener").attr("id"));
    console.log(Object.keys(triggers))
    
    if (Object.keys(triggers).indexOf(triggerDialog.data("opener").attr("id")) < 0 ) {
        console.log("Here");
        
        var form = $("#trigger-form fieldset");
        
        while (form.children().length > 5) {
                console.log(form.last());
                form.children().last().remove();
        }
        
        var timerLabel = $(document.createElement("label"));
        timerLabel.attr("for", "timer");
        timerLabel.html("Time (seconds): ")

        var timer = $(document.createElement("input"));
        timer.attr("id", "timer");
        timer.attr("name", "timer");
        timer.attr("type", "number");
        
        var targetLabel = $(document.createElement("label"));
        targetLabel.attr("for", "target");
        targetLabel.html("Target Container:")

        var target = $(document.createElement("select"));
        target.attr("id", "target");
        target.attr("name", "target");
        
        $.each(containers, function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    target.append(option);
        });

        form.append(document.createElement("br"));
        form.append(timerLabel);
        form.append(timer);
        
        form.append(document.createElement("br"));
        form.append(targetLabel);
        form.append(target);
        
        $("#trigger-type").change( function() {
            var trigger = $(this).val();
            console.log("trigger");
            var form = $("#trigger-form fieldset");

            while (form.children().length > 5) {
                console.log(form.last());
                form.children().last().remove();
            }

            if (trigger == "timer") {

                var timerLabel = $(document.createElement("label"));
                timerLabel.attr("for", "timer");
                timerLabel.html("Time (seconds) ")

                var timer = $(document.createElement("input"));
                timer.attr("id", "timer");
                timer.attr("name", "timer");
                timer.attr("type", "number");

                var targetLabel = $(document.createElement("label"));
                targetLabel.attr("for", "target");
                targetLabel.html("Target Container ")

                var target = $(document.createElement("select"));
                target.attr("id", "target");
                target.attr("name", "target");

                $.each(containers, function(index, value){
                            option = $(document.createElement("option"));
                            option.attr("value", value);
                            option.html(value);
                            target.append(option);
                });

                form.append(document.createElement("br"));
                form.append(timerLabel);
                form.append(timer);

                form.append(document.createElement("br"));
                form.append(targetLabel);
                form.append(target);
            }
            
            else if (trigger == "event") {

                var resLabel = $(document.createElement("label"));
                resLabel.attr("for", "res-select");
                resLabel.html("Resource ");

                var resSelect = $(document.createElement("select"));
                resSelect.attr("id", "res-select");
                resSelect.attr("name", " res-select");

                $.each(Object.keys(resources), function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    resSelect.append(option);
                });

                form.append(document.createElement("br"));
                form.append(resLabel);
                form.append(resSelect);

                var eventLabel = $(document.createElement("label"));
                eventLabel.attr("for", "event-select");
                eventLabel.html("Event ");

                var eventSelect = $(document.createElement("select"));
                eventSelect.attr("id", "event-select");
                eventSelect.attr("name", " event-select");

                var r = resources[Object.keys(resources)[0]];
                console.log(r);
                
                
                $.each(specs[r.container].res[r.type].events, function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    eventSelect.append(option);
                });
                
                form.append(document.createElement("br"));
                form.append(eventLabel);
                form.append(eventSelect)
                
                resSelect.change(function (){

                    var r = resources[$(this).val()];

                    $.each(specs[r.container].res[r.type].events, function(index, value){
                        option = $(document.createElement("option"));
                        option.attr("value", value);
                        option.html(value);
                        eventSelect.append(option);
                    });
                })
            }

        });
    }
    else
        loadTriggerParams();
}
    
function setTrigger() {
    var id = triggerDialog.data("opener").attr("id");
    var form = $(this);
    
    var trigger = {};
    
    trigger.flowname = $("#flowname").val();
    
    trigger.type = $("#trigger-type").val();
    if(trigger.type == "timer") {
        trigger.val = $("#timer").val();
        trigger.target = $("#target").val();
    }
    else if (trigger.type == "event"){
        trigger.res = $("#res-select").val();
        trigger.target = resources[trigger.res].container
        trigger.val = resources[trigger.res].type + "/" + resources[trigger.res].pin;
        trigger.event = $("#event-select").val();
    }
    
    triggers[id] = trigger;
    
    triggerDialog.dialog("close");
    
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
    
    //Resource creation alert to server.
    $.ajax({
        method: "POST",
        url: "/" + container + "/" + type + "/",
        data: {"ep" : pin}
    });
    
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

function loadTriggerParams() {
    var id = triggerDialog.data("opener").attr("id");
    
    if(triggers[id] != undefined) {
        $("#flowname").val(triggers[id].flowname);
        $("#trigger-type").val(triggers[id].type);
        
        if (triggers[id].type == "timer") {
            $("#timer").val(triggers[id].val); 
        }
        else if (triggers[id].type == "event") {
            $("#res-select").val(triggers[id].res);
            $("#event-select").val(triggers[id].event);
        }
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

/*function initializePalette() {
    //"../res/containers.txt"
    $.getJSON("/containers/", function(data) {
        containers = data.containers;
        console.log(containers)
        
        specs = {};
        $.each(containers, function(index, containervalue){
            createBlock(containervalue);
            
            //"../res/specsample-" + containervalue + ".txt"
            $.getJSON("/containers/", {"container": containervalue, "refresh": "true"},function(data) {
                specs[containervalue] = data;
                
                $.each(Object.keys(specs[containervalue].res), function(index, value) {
                    createResourceType(value,containervalue)
                })
                loadResources();
            })
        });
    });
}*/

function initializePalette() {
    //"../res/containers.txt"
    $.getJSON("../res/containers.txt", function(data) {
        containers = data.containers;
        console.log(containers)
        
        specs = {};
        $.each(containers, function(index, containervalue){
            createBlock(containervalue);
            
            //"../res/specsample-" + containervalue + ".txt"
            $.getJSON("../res/specsample-" + containervalue + ".txt",function(data) {
                specs[containervalue] = data;
                
                $.each(Object.keys(specs[containervalue].res), function(index, value) {
                    createResourceType(value,containervalue)
                })
                loadResources();
            })
        });
    });
}