define(function() {

    function Base() {
        this.__engine = null;
    };
    Base.prototype.injectEngine = function (engine) {
        if (this.__engine) {
            throw new Error(this.constructor.name + " has already received an engine instance.");
        }
        this.__engine = engine;
    };

    return Base;

});