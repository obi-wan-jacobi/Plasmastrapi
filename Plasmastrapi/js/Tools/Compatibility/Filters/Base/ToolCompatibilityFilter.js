define(['dictionary'],
function (Dictionary) {

    function ToolCompatibilityFilter() {
        this.__dictionary = new Dictionary(Compatible);
    };
    ToolCompatibilityFilter.prototype.evaluate = function (pickComponent) {
        for (var i = 0, L = this.__dictionary.length; i < L; i++) {
            if (this.__dictionary[i].resolve(pickComponent)) {
                return true;
            }
        }
        return false;
    };

    return ToolCompatibilityFilter;
});