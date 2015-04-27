var meta;
var containers = [];
var specs = {};
var resources = {};
var functions = {};
var triggers = {};

var dashboardEvents = {};
var dashboardResources = {};
var dashboardTriggerResources = {};

function setInfoText() {
    var elem =$(this);
    
    $("#element-info").html("");
    
    var table = $(document.createElement("table"));
    table.addClass("table table-striped table-hover");
    
    table.html("<tr><th>Key</th><th>Value</th></tr>")
    var displayData;
    
    if(elem.hasClass("start")){
        displayData = triggers[elem.attr("id")];
    }
    else if(elem.hasClass("function")) {
        displayData = functions[elem.attr("id")];
    }
    else if(elem.hasClass("resource")) {
        displayData = resources[graph.elements[elem.attr("id")].html];
    }
    else if(elem.hasClass("dashboard-resource")) {
        displayData = dashboardResources[graph.elements[elem.attr("id")].html];
    }
    
    if(displayData != undefined) {
        $.each(Object.keys(displayData), function(index, key) {
            console.log(key);
            var tablerow = $(document.createElement("tr"))
            tablerow.html("<td>"+key+"</td><td>"+displayData[key]+"</td>")
            table.append(tablerow);
        })
    }
    $("#element-info").append(table);
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

function editElement(){
    $("#wheel-menu").css("visibility", "hidden");
    
    var node = $(".wheel-button.active").closest(".node");
    if ((node.hasClass("resource")) || (node.hasClass("stop")) || (node.hasClass("dashboard-resource"))) {
        alert("This element cannot be edited.");
    }
    else if(node.hasClass("start")) {
        triggerDialog.data("opener", node);
        triggerDialog.dialog("open");
    }
    else if(node.hasClass("function")) {
        functionDialog.data("opener", node);
        functionDialog.dialog("open");
    }
}

function deleteElement() {
    var instance = $("body").data("instance");
    
    $("#wheel-menu").css("visibility", "hidden");
    
    if(confirm("Delete this node?")){
        console.log($(".wheel-button.active"))
        instance.remove($(".wheel-button.active").closest(".node").attr("id"));
    }
}

function addEndpointsToElement(elem) {

    var instance = $("body").data("instance");
    
    if((elem.hasClass("resource")) || (elem.hasClass("function")) || (elem.hasClass("dashboard-resource"))){
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
    
    if (elem.hasClass("start")){
        elem.children().on("click", function(event) {
            postFlow(elem);
            event.stopPropagation();
        });
    }
    if (elem.hasClass("stop")){
        elem.children().on("click", function(event) {
            deleteFlow(elem);
            event.stopPropagation();
        });
    }
}

function addMenu(elem) {
    var menuID = "menu-" + elem.attr("id").split("-")[2]
    var menulist = $(document.createElement("ul"))
    menulist.attr("id", menuID);
    menulist.attr("data-angle", "[270,360]");
    menulist.addClass("wheel");
    menulist.append($(document.createElement("li")).addClass("item").html('<a href="#" onclick="deleteElement();"><span class="fa fa-trash fa-lg"></span></a>'));
    menulist.append($(document.createElement("li")).addClass("item").html('<a href="#" onclick="editElement();"><span class="fa fa-edit fa-lg"></span></a>'));
    
    elem.append(menulist);
    
    var menuHolder = $(document.createElement("div"));
    menuHolder.addClass("menu-holder");
    
    var menu = $(document.createElement("a"));
    menu.attr("href", "#" + menuID);
    menu.addClass("wheel-button ne")
    menu.on("click", function(event) {
        event.preventDefault();
    })
    
    menu.html("<span class='fa fa-gear fa-lg'></span>");
    
    menu.wheelmenu({
      trigger: "hover",
      animation: "fly", 
      animationSpeed: "fast"
    });
    
    menuHolder.append(menu);
    elem.append(menuHolder);
}

function configureElement(elem) {

    elem.uniqueId();
    var instance = $("body").data("instance");
    
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
    
    addMenu(elem);
}

function createBlock(containerName) {
    
    var panel = $(document.createElement("div"));
    panel.addClass("block panel panel-default");
    panel.attr("id", containerName + "-block");
    
    var heading = $(document.createElement("div"));
    heading.addClass("panel-heading");
    heading.html(containerName + "<span style='float:right' class='fa fa-chevron-down fa-lg'></span>");
    
    var body = $(document.createElement("div"));
    body.addClass("panel-body")
    
    panel.append(heading);
    panel.append(body);
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
    
    var body = $(document.createElement("div"));
    body.addClass("panel-body");
    
    panel.append(heading);
    body.append(ulist);
    panel.append(body);
    panel.appendTo($("#" + container + "-block").children( ".panel-body"));
    
}
function setFormOptions() {
    
    var hardwareContainers = containers.slice(1);
    console.log(hardwareContainers);
    
    $("#container-select").empty()
    $.each(hardwareContainers, function(index, value) {
        option = $(document.createElement("option"));
        option.attr("value", value);
        option.html(value);
        $("#container-select").append(option);
    });
    
    var container = hardwareContainers[0];
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
                    if(specs[resources[value].container].res[resources[value].type].events != undefined) {
                        option = $(document.createElement("option"));
                        option.attr("value", value);
                        option.html(value);
                        resSelect.append(option);
                    }
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

                var r = resources[$(resSelect.children("option")[0]).val()]
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
                    eventSelect.empty();
                    $.each(specs[r.container].res[r.type].events, function(index, value){
                        option = $(document.createElement("option"));
                        option.attr("value", value);
                        option.html(value);
                        eventSelect.append(option);
                    });
                })
            }
            
            else if (trigger == "dashboard-event") {

                var resLabel = $(document.createElement("label"));
                resLabel.attr("for", "dashboard-res-select");
                resLabel.html("Dashboard Resource ");

                var resSelect = $(document.createElement("select"));
                resSelect.attr("id", "dashboard-res-select");
                resSelect.attr("name", " dashboard-res-select");

                $.each(Object.keys(dashboardTriggerResources), function(index, value){
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

                var r = dashboardTriggerResources[$(resSelect.children("option")[0]).val()]
                console.log(r);
                
                $.each(dashboardEvents[r.type], function(index, value){
                    option = $(document.createElement("option"));
                    option.attr("value", value);
                    option.html(value);
                    eventSelect.append(option);
                });
                
                form.append(document.createElement("br"));
                form.append(eventLabel);
                form.append(eventSelect)
                
                resSelect.change(function (){

                    var r = dashboardTriggerResources[$(this).val()];
                    eventSelect.empty();
                    $.each(dashboardEvents[r.type], function(index, value){
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
        trigger.val = resources[trigger.res].url;
        trigger.event = $("#event-select").val();
    }
    else if (trigger.type == "dashboard-event"){
        trigger.res = $("#dashboard-res-select").val();
        trigger.target = "dashboard"
        trigger.val = dashboardTriggerResources[trigger.res].url;
        trigger.event = $("#event-select").val();
    }
    
    triggers[id] = trigger;
    
    triggerDialog.dialog("close");
    
}
function addResource() {
    
    var listItem = $(document.createElement("li"));
    listItem.addClass("list-group-item");
    
    var res = $(document.createElement("div"));
    res.addClass("node resource")
    res.html($("#name").val());
    
    res.draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    var container = $("#container-select").val();
    var type = $("#type-select").val();
    var pin = $("#custom-pin").prop("checked")? $("#custom-pin-value").val():$("#pin-select").val();
    
    listItem.append(res);
    $(".list-group." + container + "." + type).append(listItem);
    
    //Resource creation alert to server.
    $.ajax({
        method: "POST",
        url: "/" + container + "/" + type + "/",
        data: {"ep" : pin},
        success: function (data) {
            if(Object.keys(data).indexOf("ep") >= 0) {
                
                resources[$("#name").val()] = {
                    container: container,
                    type: type,
                    pin: pin,
                    url: data.ep
                }
                
                resourceDialog.dialog("close");
            }
            console.log(data)
        }
    });
    
    /*resources[$("#name").val()] = {
        container: container,
        type: type,
        pin: pin,
        url: type + '/' + pin
    }
    resourceDialog.dialog("close");*/
    
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
        else if (triggers[id].type == "dashboard-event") {
            $("#dashboard-res-select").val(triggers[id].res);
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
    addMenu(functionDialog.data("opener"));
    functionDialog.dialog("close"); 
}

function clearPalette() {
    
    $("#palette").html('<div class="panel panel-default"><ul class="list-group"><li class="list-group-item"><div class="node start"><div class="init"></div></div></li>' + 
                       '<li class="list-group-item"><div class="node stop"><div class="end"></div></li><li class="list-group-item"><div class="node function">Function</div></li></ul></div>');
    
    $("#palette").find(".start").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    $("#palette").find(".stop").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    $("#palette").find(".function").draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
}

function hideDropdown() {
    var panel= $(this);
    panel.children("span").removeClass("fa-chevron-up");
    panel.children("span").addClass("fa-chevron-down");
    panel.siblings(".panel-body").slideUp();
    
    panel.off("click", hideDropdown);
    panel.on("click", showDropdown);
}

function showDropdown() {
    var panel= $(this);
    panel.children("span").removeClass("fa-chevron-down");
    panel.children("span").addClass("fa-chevron-up");
    panel.siblings(".panel-body").slideDown();
    
    panel.off("click", showDropdown);
    panel.on("click", hideDropdown);
    
}

function createDashboardResource(type, widgetID, panelID) {
    
    var listItem = $(document.createElement("li"));
    listItem.addClass("list-group-item");
    
    var res = $(document.createElement("div"));
    res.addClass("node dashboard-resource")
    res.html(panelID + "/" + widgetID);
    
    res.draggable({
        revert: "invalid",
        scope: "chart",
        appendTo: "#chart",
        helper: "clone"
    });
    
    listItem.append(res);
    $(".list-group.dashboard").append(listItem);
    
    dashboardResources[widgetID] = {
        type : type,
        url : panelID + "/" + widgetID
    }
}

function loadDashboardResources() {
    
    //"../res/events.txt"
    //"/dashboard/events/"
    $.getJSON("/dashboard/events/", function (data) {
        dashboardEvents = data;
        
        console.log(specs["dashboard"])
        
        var ulist =$(document.createElement("ul"));
        ulist.addClass("list-group dashboard");
        
        $("#dashboard-block .panel-body").append(ulist);
        
        $.each(Object.keys(specs["dashboard"]), function (index, panelID) {
            console.log(panelID)
            $.each(Object.keys(specs["dashboard"][panelID]), function (index, widgetID) {
                console.log(widgetID)
                if(Object.keys(dashboardEvents).indexOf(specs["dashboard"][panelID][widgetID]) == -1) {
                    console.log("createResource")
                    createDashboardResource(specs["dashboard"][panelID][widgetID], widgetID, panelID);
                }
                else {
                    dashboardTriggerResources[widgetID] = {
                        type : specs["dashboard"][panelID][widgetID],
                        url : panelID + "/" + widgetID
                    }
                }
            })
        })
    })
}
function initializePalette() {
    
    //"../res/containers.txt"
    //"/containers/"
    $.getJSON("/containers/", function(data) {
        containers = data.containers;
        console.log(containers)
        
        specs = {};
        $.each(containers, function(index, containervalue){
            createBlock(containervalue);
            
            //"../res/specsample-" + containervalue + ".txt"
            //"/containers/", {container: containervalue, refresh: "true"}
            $.getJSON("/containers/", {container: containervalue, refresh: "true"},  function(data) {
                specs[containervalue] = data;
                
                if (containervalue == "dashboard") {
                    console.log(containervalue)
                    loadDashboardResources();
                }
                else {
                    
                    $.each(Object.keys(specs[containervalue].res), function(index, value) {
                        createResourceType(value,containervalue)
                    })
                    loadResources();
                }
            })
            
            $("#" + containervalue + "-block .panel-body").hide();
            $("#" + containervalue + "-block .panel-heading").on("click", showDropdown);
        });
    });
}