define(function () {

    function PickableTrait(PickableTraitType) {
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