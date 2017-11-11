define(['base', 'validator'], function (Base, validator) {

    Factory.prototype = Object.create(Base.prototype);
    Factory.prototype.constructor = Factory;
    function Factory(engine) {
        Base.call(this, engine);
    };
    // private methods
    Factory.prototype.__oninit = function () { };
    Factory.prototype.__onload = function () { };
    Factory.prototype.__onunload = function () { };
    // public methods
    Factory.prototype.create = function (Type) {
        validator.throwMethodMustBeOverridden(this, 'create');
    };
    Factory.prototype.getContainer = function () {
        validator.throwMethodMustBeOverridden(this, 'getContainer');
    };

    return Factory;
});