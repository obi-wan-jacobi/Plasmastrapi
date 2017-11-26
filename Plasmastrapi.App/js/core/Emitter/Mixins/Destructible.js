define(['mixin', 'utils'],
function (Mixin, utils) {

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
        // In complex cases, the maximum permissible number of destroy calls for one object is 2
        // TODO: Reduce destroy() calls to 1 in all cases (may require overhaul of Dictionary and LinkedList)
        if (this.__numberOfDestroyCalls > 1) {
            utils.logging.warn(this, 'destroy', `This method was called on the same ${this.constructor.name} object ${this.__numberOfDestroyCalls} times; re-evaluate this object\'s dependency chain`);
        }
        if (this.__isDestroyed) {
            return;
        }
        this.__isDestroyed = true
        this.emit('ondestroy', this);
    };

    return Destructible;
});