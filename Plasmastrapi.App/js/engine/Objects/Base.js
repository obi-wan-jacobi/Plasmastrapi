define(function() {

    function Base() {
        this.__engine = null;
    };
    // public prototypal variables
    Object.defineProperties(Base.prototype, {
        'isEngineInjected': {
            get: function () {
                return this.__engine ? true : false;
            }
        }
    });
    // public methods
    Base.prototype.injectEngine = function (engine) {
        if (this.__engine) {
            throw new Error(this.constructor.name + " has already received an engine instance.");
        }
        if (!engine) {
            throw new Error(this.constructor.name + " cannot be given a null engine instance.");
        }
        this.__engine = engine;
    };

    return Base;
});