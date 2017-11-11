define(['base', 'validator'],
function (Base, validator) {

    // CLASS System
    System.prototype = Object.create(Base.prototype);
    System.prototype.constructor = System;
    function System(engine) {
        // inherits from
        Base.call(this, engine);
    };
    // private methods
    System.prototype.__oninit = function () { };
    System.prototype.__onload = function () { };
    System.prototype.__onunload = function () { };
    // public methods
    System.prototype.loopOnce = function (deltaMs) {
        validator.throwMethodMustBeOverridden(this, 'loopOnce');
    };

    return System;
});