define(['dictionary', 'compatibility-attribute', 'validator'],
function (Dictionary, CompatibilityAttribute, validator) {

    function CompatibilityFilter(/* Attribute1, Attribute2, etc. */) {
        this.__dictionary = new Dictionary(CompatibilityAttribute);
        for (var i = 0, L = arguments.length; i < L; i++) {
            var ClassType = arguments[i];
            validator.validateClassType(this, ClassType, CompatibilityAttribute)
            this.__dictionary.add(ClassType.name, new ClassType());
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