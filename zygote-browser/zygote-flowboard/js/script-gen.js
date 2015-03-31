var resCounter = 1;
var funcCounter = 1;

var res = {};
var func = {};

var script="";

function parseFlow(elem, prev) {
    
    var parsed;
    
    if(elem.hasClass("resource")) {
        res["_r"+(resCounter)] = resources[elem.html()];
        res["_r"+(resCounter)].id = elem.attr("id");
        parsed = "_r"+(resCounter++)
    }
    if(elem.hasClass("function")) {
        func["_f"+(funcCounter)] = functions[elem.attr("id")]
        func["_f"+(funcCounter)].next =  graph.elements[elem.attr("id")].next;
        func["_f"+(funcCounter)].pre = prev;
        parsed = "_f"+(funcCounter++)
    }
    if(elem.hasClass("start"))
        parsed = "start";
    if(elem.hasClass("stop"))
        return;
    
    for (item in graph.elements[elem.attr("id")].next){
        parseFlow($("#" + graph.elements[elem.attr("id")].next[item][1]), parsed)
    }
}

function defineResources() {
    for (item in res){
        
        var container = res[item].container;
        var url = res[item].type + "/" + res[item].pin;
        
        var definition = "var " + item + " = new Resource('" + container + "', '" + url + "'); \n"
        script += definition;
    }
}

function defineFunctions() {
    for (item in func) {
        var name = func[item].name;
        var fdef = func[item].definition;
        
        var definition = "function " + item + "(data) {\n" + fdef + "\n}\n";
        script += definition;
        
        var endpointCount = func[item].endpoints;
        var endpoints = []
        for(var i = 0; i < endpointCount; ++i ) {
            if(func[item].next[i] != undefined) {
                for (r in res) {
                    if (func[item].next[i][1] == res[r].id) {
                        endpoints.push(r);
                        break;
                    }
                }
                for (f in functions) {
                    if (func[item].next[i][1] == f) {
                        console.log("Inside");
                        for(fn in func ) {
                            console.log(fn)
                            if(functions[f].name == func[fn].name){
                                endpoints.push(fn);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            else
                endpoints.push(null);
            func[item].endpointList = endpoints;
            console.log(endpoints);
        }
        script += "var " + item + "_eps = " + "[" + endpoints + "]" +";\n"; 
    }
}

function passOnOutput(fn) {
    console.log("Pass on output");
    
    for(var i = 0; i < func[fn].endpointList.length; ++i) {
        var ep = func[fn].endpointList[i];
        console.log("ep: " + ep);
        if(Object.keys(res).indexOf(ep) > -1) {
            var write = "if (" + fn + "_output[" + i + "] != null) {\n" + ep + ".write(" + fn + "_output[" + i + "]);\n}\n"; 
            script += write;
        }
        else if(Object.keys(func).indexOf(ep) > -1) {
            var call = "if (" + fn + "_output[" + i + "] != null) {\n var" + ep + "_output" + "= " + ep + "(" + fn + "_output[" + i + "]);\n"
            script += call;
            passOnOutput(ep);
            script +="}\n";
        }
        else if(ep == null) {
            var comment = "//The endpoint " + i + " of function " + fn + " is not connected.\n"
            script += comment;
        }
    }
}

function generateDataFlow(elem) {
    if(elem.hasClass("function")){
        var fn;
        console.log("Function");
        for(f in func) {
            if(func[f].name == functions[elem.attr("id")].name) {
                fn = f;
                break;
            }
        }
        console.log(fn)
        
        var prev = func[fn].pre;
        console.log(prev);
        console.log(Object.keys(res))
        var call;
        
        if (Object.keys(res).indexOf(prev) > -1) {
            
            //Get data and call function.
            call = prev + ".read({}, function(" + prev + "_data) { \n " + fn + "_output = " + fn + "(" + prev + "_data); \n"
            script += call;
            
            //Pass on the output
            passOnOutput(fn); 
            
            var callEnd= "});";
            script += callEnd;
        }
        else if (prev == "start"){
            call = "var " + fn + "_output = " + fn + "(event_data); \n ";
            script += call;
            
            //Pass on the output
            passOnOutput(fn);
        }
        
    }
    else if(elem.hasClass("stop")) 
        return;
    
    for (item in graph.elements[elem.attr("id")].next){
        generateDataFlow($("#" + graph.elements[elem.attr("id")].next[item][1]))
    }
}

function generateScript(startElem) {
    console.log("Script generation...")
    
    res = {};
    func = {};
    script = "";
    
    parseFlow(startElem);
    console.log(JSON.stringify(res));
    console.log(JSON.stringify(func));
    
    defineResources();
    defineFunctions();
    console.log(script);
    
    generateDataFlow(startElem);
    console.log(script);
    
    //Send script to server here.
    flowData = {};
    flowData.flow = script;
    flowData.target = triggers[startElem.attr("id")].target;
    
    flowData.trigger = {}
    flowData.trigger.type = triggers[startElem.attr("id")].type;
    flowData.trigger.val = triggers[startElem.attr("id")].val;
    if (flowData.trigger.type == "event") {
        flowData.trigger.event = triggers[startElem.attr("id")].event;
    }
    
    console.log(JSON.stringify(flowData));
    
    ;
    
}