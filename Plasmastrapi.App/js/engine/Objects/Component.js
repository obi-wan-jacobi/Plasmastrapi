define(["./EventEmitter"], function(EventEmitter) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component() {
        EventEmitter.call(this);
        // private variables
        this.__entity = null;
        this.__engine = null;
    };
    Component.prototype.injectEntity = function(entity) {
        if (!this.__entity) {
            this.__entity = entity;
            return true;
        }
        return false;
    };
    Component.prototype.injectEngine = function(engine) {
        if (!this.__engine) {
            this.__engine = engine;
            return true;
        }
        return false;
    };

    // apply event mixins
    EventEmitter.Mixins.Loadable.call(Component.prototype);
    EventEmitter.Mixins.Destructible.call(Component.prototype);

    return Component;

});