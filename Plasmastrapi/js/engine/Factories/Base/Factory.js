define(['validator'], function (validator) {

    function Factory(Type) {
        this.__Type = Type
    };
    // public methods
    Factory.prototype.create = function (Type) {
        validator.throwMethodMustBeOverridden(this, 'create');
    };
    Factory.prototype.getContainer = function () {
        validator.throwMethodMustBeOverridden(this, 'getContainer');
    };

    return Factory;
});