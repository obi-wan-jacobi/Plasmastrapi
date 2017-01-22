define([], function () {

    function Injector(engineInstance) {
        this.__instance = engineInstance;
    };
    Injector.prototype.resolve = function (dependent) {
        dependent.injectEngine(this.__instance);
    };

    return Injector;
});