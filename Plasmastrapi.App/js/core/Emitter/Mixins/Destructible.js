define(['mixin', 'validator'],
function (Mixin, validator) {

    Destructible.prototype = Object.create(Mixin.prototype);
    Destructible.prototype.constructor = Destructible;
    function Destructible() {
        Mixin.call(this, 'destructible');
        Mixin.prototype.defineProperty.call(this, 'isDestroyed', false);
        this.registerEvents(
            'ondestroy'
        );
    };
    Destructible.prototype.destroy = function () {
        if (this.__isDestroyed) {
            validator.throw(this, 'destroy', 'Objects cannot be destroyed more than once');
        }
        this.__isDestroyed = true
        this.emit('ondestroy', this);
    };

    return Destructible;
});