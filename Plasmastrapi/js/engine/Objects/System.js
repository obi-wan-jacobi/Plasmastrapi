define([],
function () {

    // CLASS System
    System.prototype = Object.create(Emitter.prototype);
    System.prototype.constructor = System;
    function System() {
        Emitter.call(this);
        // apply mixins
        Emitter.Mixins.Loadable.call(this, true);
        Emitter.Mixins.Pausable.call(this, true);
    };

    return System;
});