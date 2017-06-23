define(['validator'],
function (validator) {

    // CLASS Base
    function Base() {
        // private variables
        this.__isInitialized = false;
        this.__isLoaded = false;
    };
    // private methods
    Base.prototype.__oninit = function () {
        validator.throwMethodMustBeOverridden(this, 'oninit');
    };
    Base.prototype.__onload = function () {
        validator.throwMethodMustBeOverridden(this, 'onload');
    };
    Base.prototype.__onunload = function () {
        validator.throwMethodMustBeOverridden(this, 'onunload');
    };
    // public methods
    Base.prototype.load = function () {
        if (this.__isLoaded) {
            return;
        }
        this.__isLoaded = true;
        if (!this.__isInitialized) {
            this.__isInitialized = true;
            this.__oninit();
        }
        this.__onload();
    };
    Base.prototype.unload = function () {
        if (!this.__isLoaded) {
            return;
        }
        this.__isLoaded = false;
        this.__onunload();
    };
    Base.prototype.reload = function () {
        this.unload();
        this.load();
    };

    return Base;
});