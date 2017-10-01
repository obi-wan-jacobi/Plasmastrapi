define([],
function () {

    function ToolCompatibilityFilter() {
        this.__dictionary = new Dictionary(Compatible);
    };
    ToolCompatibilityFilter.prototype.evaluate = function (pickComponent) {
        for (var i = 0, L = this.__compatibles.length; i < L; i++) {
            if (this.__compatibles[i].resolve(pickComponent.__entity)) {
                return true;
            }
        }
        return false;
    };

    return ToolCompatibilityFilter;
});