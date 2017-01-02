define(["./EventEmitter"], function(EventEmitter) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component() {
        EventEmitter.call(this);
        // private variables
        this.__entity = null;
    };
    Component.prototype.injectEntity = function(entity) {
        if (this.__entity) {
            throw new Error(this.constructor.name + " has already received an entity instance.");
        }
        this.__entitye = entity;
    };

    // apply event mixins
    EventEmitter.Mixins.Loadable.call(Component.prototype);
    EventEmitter.Mixins.Destructible.call(Component.prototype);

    return Component;

});