define(["./EventEmitter", "../Components/Decorators/Drawable"], function(EventEmitter, Drawable) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component() {
        EventEmitter.call(this);
        // private variables
        this.__entity = null;
        // apply decorators
        EventEmitter.Decorators.Loadable.call(this);
        EventEmitter.Decorators.Destructible.call(this);
    };
    Component.prototype.injectEntity = function(entity) {
        EventEmitter.prototype.injectEngine.call(this, entity.__engine);
        this.__entity = entity;
        this.__entity.addEventListener('onload', this, this.load);
        this.__entity.addEventListener('onunload', this, this.unload);
        this.__entity.addEventListener('ondestroy', this, this.destroy);
    };

    // decorators
    Component.Decorators = {
        Drawable
    };

    return Component;
});