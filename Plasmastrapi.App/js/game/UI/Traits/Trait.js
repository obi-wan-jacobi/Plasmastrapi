define(function () {

    function Trait(TraitType) {
        Object.defineProperties(this, {
            ['is' +TraitType.name]: {
                get: function () {
                    return true;
                }
            }
        });
        TraitType.resolve = Trait.prototype.resolve.bind(TraitType);
    };
    Trait.prototype.resolve = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return Trait;
});