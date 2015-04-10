function ToggleButtonWidget() {
    
    ToggleButtonWidget.prototype = $.extend(EventEmitter.prototype, {});
    
    this.value = {}
    this.widgetObj = undefined;
    this.panel = undefined;
    this.modal = undefined;
    
    this.create = function () {
        
        //Open dialog for settings
        //Create and append widget.
        
    }
    
    this.config = function () {
        //Open dialog for settings.
        //Edit widget object.
    }
    
    this.read = function () {
        
    }
    
    this.write = function () {
        
    }
    
}