define(function () {

    function Filter(compatiblesArray) {
        this.__list = compatiblesArray;
    };
    Filter.prototype.resolve = function (pickableComponent) {
        for (var i = 0, L = this.__list.length; i < L; i++) {
            if (this.__list[i].resolve(pickableComponent.__entity)) {
                return true;
            }
        }
        return false;
    };

    return Filter;
});