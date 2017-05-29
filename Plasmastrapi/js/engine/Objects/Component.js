define(['event-emitter', 'drawable'],
function (EventEmitter, Drawable) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component() {
        EventEmitter.call(this);
        // private variables
        this.__entity = null;
        // apply mixins
        EventEmitter.Mixins.Loadable.call(this);
        EventEmitter.Mixins.Destructible.call(this);
    };
    Component.prototype.injectEntity = function(entity) {
        EventEmitter.prototype.injectEngine.call(this, entity.__engine);
        this.__entity = entity;
        this.__entity.addEventListener('onload', this, this.load);
        this.__entity.addEventListener('onunload', this, this.unload);
        this.__entity.addEventListener('ondestroy', this, this.destroy);
    };

    // mixins
    Component.Mixins = {
        Drawable
    };

    return Component;
});