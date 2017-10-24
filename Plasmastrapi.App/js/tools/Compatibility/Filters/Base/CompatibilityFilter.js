define(['dictionary', 'compatibility-attribute'],
function (Dictionary, CompatibilityAttribute) {

    function CompatibilityFilter(/* attribute1, attribute2, etc. */) {
        this.__dictionary = new Dictionary(CompatibilityAttribute);
        for (var i = 0, L = arguments.length; i < L; i++) {
            this.__dictionary.add(arguments[i].constructor.name, arguments[i]);
        }
    };
    CompatibilityFilter.prototype.evaluate = function (pickComponent) {
        this.__dictionary.forEach(function (key, attribute) {
            if (attribute.evaluate(pickComponent)) {
                return true;
            }
        });
        return false;
    };

    return CompatibilityFilter;
});