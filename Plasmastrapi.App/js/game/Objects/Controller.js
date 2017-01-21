define(["../../engine/Objects/EventEmitter"], function (EventEmitter) {

    // CLASS Controller
    Controller.prototype = Object.create(EventEmitter.prototype);
    Controller.prototype.constructor = Controller;
    function Controller() {
        EventEmitter.call(this);
    };
    Controller.prototype.injectEngine = function (engine) {
        EventEmitter.prototype.injectEngine.call(this, engine);
        this.__engine.addEventListener('onload', this, this.load);
        this.__engine.addEventListener('onunload', this, this.unload);
    };

    // apply event mixins
    EventEmitter.Mixins.Loadable.call(Controller.prototype);
    
    return Controller;

});