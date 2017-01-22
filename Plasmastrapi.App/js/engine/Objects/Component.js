define(["./EventEmitter"], function(EventEmitter) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component() {
        EventEmitter.call(this);
        // private variables
        this.__entity = null;
        // apply event mixins
        EventEmitter.Mixins.Loadable.call(this);
        EventEmitter.Mixins.Destructible.call(this);
    };
    Component.prototype.injectEntity = function(entity) {
        EventEmitter.prototype.injectEngine.call(this, entity.__engine);
        this.__entity = entity;
        this.__entity.addEventListener('onload', this, this.load);
        this.__entity.addEventListener('unload', this, this.unload);
        this.__entity.addEventListener('ondestroy', this, this.destroy);
    };

    return Component;
});