define(['factory', 'ui-element', 'component-factory', 'entity-factory', 'validator'],
    function (Factory, UIElement, ComponentFactory, EntityFactory, validator) {

        UIElementFactory.prototype = Object.create(Factory.prototype);
        UIElementFactory.prototype.constructor = UIElementFactory;
        function UIElementFactory(game) {
            Factory.call(this, UIElement);
            this.__componentFactory = game.getFactory(ComponentFactory);
            this.__entityFactory = game.getFactory(EntityFactory);
        };
        // public methods
        UIElementFactory.prototype.create = function (Type) {
            validator.validateClassType(this, Type, UIElement);
            var uiElement = this.__entityFactory.create(Type);
            return uiElement;
        };
        UIElementFactory.prototype.getContainer = function () { };

        return UIElementFactory;
    });