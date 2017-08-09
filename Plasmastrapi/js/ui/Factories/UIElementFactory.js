define(['factory', 'ui-element', 'component-factory', 'entity-factory', 'pose', 'mesh', 'vertex', 'validator'],
    function (Factory, UIElement, ComponentFactory, EntityFactory, Pose, Mesh, Vertex, validator) {

        UIElementFactory.prototype = Object.create(Factory.prototype);
        UIElementFactory.prototype.constructor = UIElementFactory;
        function UIElementFactory(game) {
            Factory.call(this, UIElement);
            this.__componentFactory = game.getFactory(ComponentFactory);
            this.__entityFactory = game.getFactory(EntityFactory);
        };
        // public methods
        UIElementFactory.prototype.create = function (Type) {
            var uiElement = this.__entityFactory.create(Type);
            validator.validateType(this, uiElement, UIElement);
            return uiElement;
        };
        UIElementFactory.prototype.getContainer = function () { };

        return UIElementFactory;
    });