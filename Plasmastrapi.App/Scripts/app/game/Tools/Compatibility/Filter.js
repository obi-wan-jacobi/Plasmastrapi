define(function () {

    function Filter(/* arguments */) {
        this.__list = arguments;
    };
    Filter.prototype.resolve = function (entity) {
        for (var i = 0, L = this.__list.length; i < L; i++) {
            if (this.__list[i].resolve(entity)) {
                return true;
            }
        }
        return false;
    };

    return Filter;
});