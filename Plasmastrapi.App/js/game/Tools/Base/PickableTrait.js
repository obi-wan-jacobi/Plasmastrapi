define(["../../../engine/Namespaces/$Components"], function ($) {

    function PickableTrait(PickableTraitType) {
        if (!(this instanceof $.PickableComponent)) {
            throw new Error(this.constructor.name + ':' + PickableTraitType.name +  '- Traits may only be applied to PickableComponents.');
        }
        Object.defineProperties(this, {
            ['is' +PickableTraitType.name]: {
                get: function () {
                    return true;
                }
            }
        });
    };
    PickableTrait.prototype.resolve = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return PickableTrait;
});