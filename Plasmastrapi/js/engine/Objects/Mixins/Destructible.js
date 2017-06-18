define([], function () {

    function Destructible() {
        var target = this;
        if (!target.registerEvents) {
            validator.throw(target.constructor.name, Destructible.constructor.name, 'Target must be an instance of Emitter');
        }
        target.__isDestroyed = false;
        Object.defineProperties(target, {
            'isDestructible': {
                get: function () {
                    return true;
                }
            },
            'isDestroyed': {
                get: function () {
                    return this.__isDestroyed;
                }
            }
        });
        target.destroy = Destructible.prototype.destroy;
        target.registerEvents(
            'ondestroy'
        );
    };
    Destructible.prototype.destroy = function () {
        if (this.__isDestroyed) {
            validator.throw(this, 'destroy', 'Objects cannot be destroyed more than once');
        }
        this.__isDestroyed = true
        this.__fire('ondestroy', this);
        if (this.isLoaded) {
            this.unload();
        }
        this.__engine.EmitterContainer.purge(this);
    };

    return Destructible;
});