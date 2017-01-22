define(["./EventEmitter"], function (EventEmitter) {

    // CLASS System
    System.prototype = Object.create(EventEmitter.prototype);
    System.prototype.constructor = System;
    function System() {
        EventEmitter.call(this);
        // apply event mixins
        EventEmitter.Mixins.Loadable.call(this, true);
        EventEmitter.Mixins.Pausable.call(this, true);
    };
    System.prototype.restart = function() {
        this.unpause();
        this.reload();
    };

    return System;
});