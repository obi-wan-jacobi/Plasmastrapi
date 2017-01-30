define(function () {

    function Compatible(Compatibility) {
        Object.defineProperties(this, {
            ['is' + Compatibility.name]: {
                get: function () {
                    return true;
                }
            }
        });
        Compatibility.resolve = Compatible.prototype.resolve.bind(Compatibility);
    };
    Compatible.prototype.resolve = function (entity) {
        if (entity["is" + this.name]) {
            return true;
        }
        return false;
    };

    return Compatible;
});