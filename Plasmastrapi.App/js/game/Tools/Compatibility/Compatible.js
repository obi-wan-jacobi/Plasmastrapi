define(function () {

    function Compatible(Compatibility) {
        Object.defineProperties(this, {
            ['is' + Compatibility.name]: {
                get: function () {
                    return true;
                }
            }
        });
        Compatibility.isSatisfiedBy = Compatible.prototype.isSatisfiedBy.bind(Compatibility);
    };
    Compatible.prototype.isSatisfiedBy = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return Compatible;
});