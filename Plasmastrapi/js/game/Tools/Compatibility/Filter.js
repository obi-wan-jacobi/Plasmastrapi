define(function () {

    function Filter(compatiblesArray) {
        this.__list = compatiblesArray;
    };
    Filter.prototype.resolve = function (pickComponent) {
        for (var i = 0, L = this.__list.length; i < L; i++) {
            if (this.__list[i].resolve(pickComponent.__entity)) {
                return true;
            }
        }
        return false;
    };

    return Filter;
});