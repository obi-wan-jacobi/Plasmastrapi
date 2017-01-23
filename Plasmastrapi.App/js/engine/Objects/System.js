define(["./EventEmitter"], function (EventEmitter) {

    // CLASS System
    System.prototype = Object.create(EventEmitter.prototype);
    System.prototype.constructor = System;
    function System() {
        EventEmitter.call(this);
        // apply decorators
        EventEmitter.Decorators.Loadable.call(this, true);
        EventEmitter.Decorators.Pausable.call(this, true);
    };

    return System;
});