define(['factory', 'validator'],
function (Factory, validator) {

    UIElementFactory.prototype = Object.create(Factory.prototype);
    UIElementFactory.prototype.constructor = UIElementFactory;
    function UIElementFactory(engine) {
        Factory.call(this, engine, 'ui-element');
        this.__entityFactory = null;
    };
    // private methods
    UIElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__entityFactory = this.__engine.getFactory('entity-factory');
    };
    // public methods
    UIElementFactory.prototype.create = function (elementString) {
        validator.validateClassType(this, elementString, this.__typeString);
        var uiElement = this.__entityFactory.create(elementString, [this.__engine]);
        return uiElement;
    };

    return UIElementFactory;
});