define(function () {

    function ToolCompatibilityFilter(compatiblesArray) {
        this.__compatibles = compatiblesArray;
    };
    ToolCompatibilityFilter.prototype.resolve = function (pickComponent) {
        for (var i = 0, L = this.__compatibles.length; i < L; i++) {
            if (this.__compatibles[i].resolve(pickComponent.__entity)) {
                return true;
            }
        }
        return false;
    };

    return ToolCompatibilityFilter;
});