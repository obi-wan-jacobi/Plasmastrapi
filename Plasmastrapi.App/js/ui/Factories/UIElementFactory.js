define(['factory', 'ui-element', 'component-factory', 'entity-factory', 'pose', 'rectangle', 'pick-handle', 'validator'],
    function (Factory, UIElement, ComponentFactory, EntityFactory, Pose, Rectangle, PickHandle, validator) {

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
            validator.validateInstanceType(this, uiElement, UIElement);
            // add components
            uiElement.addComponent(this.__componentFactory.createFromPrimitive(new Pose()));
            uiElement.addComponent(this.__componentFactory.createFromPrimitive(new Rectangle()));
            var pickComponent = this.__componentFactory.createFromDataHandle(new PickHandle(function () { }));
            uiElement.addComponent(pickComponent);

            return uiElement;
        };
        UIElementFactory.prototype.getContainer = function () { };

        return UIElementFactory;
    });