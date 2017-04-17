define(["../../../engine/Namespaces/$Objects"], function ($Objects) {

    function Compatible(PickableTraitType) {
        if (!(this instanceof $Objects.Entity)) {
            throw new Error(this.constructor.name + ':' + PickableTraitType.name +  '- Traits may only be applied to Entities.');
        }
        Object.defineProperties(this, {
            ['is' +PickableTraitType.name]: {
                get: function () {
                    return true;
                }
            }
        });
    };
    Compatible.prototype.resolve = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return Compatible;
});