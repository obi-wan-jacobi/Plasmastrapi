define(["../../engine/Objects/EventEmitter"], function (EventEmitter) {

    // CLASS Controller
    Controller.prototype = Object.create(EventEmitter.prototype);
    Controller.prototype.constructor = Controller;
    function Controller() {
        EventEmitter.call(this);
        // apply event mixins
        EventEmitter.Mixins.Loadable.call(this);
    };
    Controller.prototype.instantiate = function (engine) {
        EventEmitter.prototype.instantiate.call(this, engine);
        this.__engine.addEventListener('onload', this, this.load);
        this.__engine.addEventListener('onunload', this, this.unload);
    };
    
    return Controller;
});