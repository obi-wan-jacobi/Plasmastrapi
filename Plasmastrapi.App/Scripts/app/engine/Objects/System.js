define(['event-emitter'],
function (EventEmitter) {

    // CLASS System
    System.prototype = Object.create(EventEmitter.prototype);
    System.prototype.constructor = System;
    function System() {
        EventEmitter.call(this);
        // apply mixins
        EventEmitter.Mixins.Loadable.call(this, true);
        EventEmitter.Mixins.Pausable.call(this, true);
    };

    return System;
});