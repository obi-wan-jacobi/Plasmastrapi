define(['dictionary', 'compatibility-attribute'],
function (Dictionary, CompatibilityAttribute) {

    function CompatibilityFilter(/* Attribute1, Attribute2, etc. */) {
        this.__dictionary = new Dictionary(CompatibilityAttribute);
        for (var i = 0, L = arguments.length; i < L; i++) {
            this.__dictionary.add(argument);
        }
    };
    CompatibilityFilter.prototype.evaluate = function (pickComponent) {
        for (var i = 0, L = this.__dictionary.length; i < L; i++) {
            if (this.__dictionary[i].prototype.resolve(pickComponent)) {
                return true;
            }
        }
        return false;
    };

    return CompatibilityFilter;
});