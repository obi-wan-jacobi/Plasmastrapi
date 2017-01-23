define(["../../engine/Objects/EventEmitter"], function (EventEmitter) {

    // CLASS Controller
    Controller.prototype = Object.create(EventEmitter.prototype);
    Controller.prototype.constructor = Controller;
    function Controller() {
        EventEmitter.call(this);
        // apply event mixins
        EventEmitter.Mixins.Loadable.call(this, true);
    };
    
    return Controller;
});