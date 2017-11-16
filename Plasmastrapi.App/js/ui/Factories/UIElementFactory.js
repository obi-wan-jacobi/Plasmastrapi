define(['extended-factory', 'validator'],
function (ExtendedFactory, validator) {

    UIElementFactory.prototype = Object.create(ExtendedFactory.prototype);
    UIElementFactory.prototype.constructor = UIElementFactory;
    function UIElementFactory(engine) {
        ExtendedFactory.call(this, engine, 'entity-factory', 'ui-element');
    };
    // public methods
    UIElementFactory.prototype.create = function (elementString) {
        return ExtendedFactory.prototype.create.call(this, elementString, [this.__engine]);
    };

    return UIElementFactory;
});