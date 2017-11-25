define(['mixin', 'validator'],
function (Mixin, validator) {

    Destructible.prototype = Object.create(Mixin.prototype);
    Destructible.prototype.constructor = Destructible;
    function Destructible() {
        Mixin.call(this, 'destructible');
        Mixin.prototype.addProperty.call(this, '__numberOfDestroyCalls', 0);
        Mixin.prototype.defineProperty.call(this, 'isDestroyed', false);
        this.registerEvents(
            'ondestroy'
        );
    };
    Destructible.prototype.destroy = function () {
        this.__numberOfDestroyCalls++;
        // In complex cases, the maximum number of necessary/permissible destroy calls for one object is 2
        if (this.__numberOfDestroyCalls > 1) {
            validator.throw(this, 'destroy', `Multiple destroy() calls on ${this.constructor.name}; re-evaluate this object\'s dependency chain`);
        }
        if (this.__isDestroyed) {
            return;
        }
        this.__isDestroyed = true
        this.emit('ondestroy', this);
    };

    return Destructible;
});