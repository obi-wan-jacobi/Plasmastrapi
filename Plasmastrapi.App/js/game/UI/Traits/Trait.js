define(function () {

    function Trait(TraitType) {
        Object.defineProperties(this, {
            ['is' +TraitType.name]: {
                get: function () {
                    return true;
                }
            }
        });
        TraitType.isSatisfiedBy = Trait.prototype.isSatisfiedBy.bind(TraitType);
    };
    Trait.prototype.isSatisfiedBy = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return Trait;
});