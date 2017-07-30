define(['factory', 'ui-element-factory', 'button', 'component-factory', 'image-handle', 'image-display-settings', 'pick-handle', 'utils', 'ui-config'],
    function (Factory, UIElementFactory, Button, ComponentFactory, ImageHandle, ImageDisplaySettings, PickHandle, utils, config) {

        ButtonFactory.prototype = Object.create(Factory.prototype);
        ButtonFactory.prototype.constructor = ButtonFactory;
        function ButtonFactory(game) {
            Factory.call(this, Button);
            this.__componentFactory = game.getFactory(ComponentFactory);
            this.__uiElementFactory = game.getFactory(UIElementFactory);
            this.__assetMap = game.getAssetMap();
        };
        // public methods
        ButtonFactory.prototype.create = function (Type, args) {
            var button = this.__uiElementFactory.create(Type, args, config.Button.displayLayer);
            utils.validator.validateType(this, button, Button);
            // add components
            var image = this.__assetMap.get(utils.modules.getModulePrefix(Type, null));
            var displaySettings = new ImageDisplaySettings(displayLayer, null, null, image.width, image.height, image.width, image.height);
            uiElement.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings))); // image
            button.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(button.activate))); // pick
            return button;
        };
        ButtonFactory.prototype.getContainer = function () { };

        return ButtonFactory;
    });

