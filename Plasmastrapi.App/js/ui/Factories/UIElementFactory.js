define(['factory', 'entity-factory', 'validator'],
function (Factory, EntityFactory, validator) {

    UIElementFactory.prototype = Object.create(Factory.prototype);
    UIElementFactory.prototype.constructor = UIElementFactory;
    function UIElementFactory(engine) {
        Factory.call(this, engine);
        this.__entityFactory = null;
    };
    // private methods
    UIElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__entityFactory = this.__engine.getFactory('entity-factory');
    };
    // public methods
    UIElementFactory.prototype.create = function (elementString) {
        validator.validateClassType(this, elementString, 'ui-element');
        var uiElement = this.__entityFactory.create(elementString, [this.__engine]);
        return uiElement;
    };
    UIElementFactory.prototype.getContainer = function () { };

    return UIElementFactory;
});