define(["./EventEmitter"], function (EventEmitter) {

    // CLASS System
    System.prototype = Object.create(EventEmitter.prototype);
    System.prototype.constructor = System;
    function System() {
        EventEmitter.call(this);
    };
    System.prototype.injectEngine = function (engine) {
        EventEmitter.prototype.injectEngine.call(this, engine);
        this.__engine.addEventListener('onload', this, this.load);
        this.__engine.addEventListener('onunload', this, this.unload);
        this.__engine.addEventListener('onpause', this, this.pause);
        this.__engine.addEventListener('onunpause', this, this.unpause);
    };
    System.prototype.restart = function() {
        this.unpause();
        this.reload();
    };

    // apply event mixins
    EventEmitter.Mixins.Loadable.call(System.prototype);
    EventEmitter.Mixins.Pausable.call(System.prototype);

    return System;

});