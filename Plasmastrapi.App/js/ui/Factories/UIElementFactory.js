define(['factory', 'ui-element', 'component-factory', 'entity-factory', 'image-handle', 'image-display-settings', 'text-handle', 'text', 'validator', 'ui-config'],
function (Factory, UIElement, ComponentFactory, EntityFactory, ImageHandle, ImageDisplaySettings, TextHandle, Text, validator, config) {

    UIElementFactory.prototype = Object.create(Factory.prototype);
    UIElementFactory.prototype.constructor = UIElementFactory;
    function UIElementFactory(game) {
        Factory.call(this, UIElement);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__entityFactory = game.getFactory(EntityFactory);
        this.__assetMap = game.getAssetMap();
    };
    // private methods
    UIElementFactory.prototype.__validateImageExists = function (imageName) {
        var image = this.__assetMap.get(imageName);
        if (!image) {
            validator.throw(this, 'validateImageExists', `No image corresponding to ${imageName} was found`);
        }
        return image;
    };
    // public methods
    UIElementFactory.prototype.create = function (UIElementType, imageName) {
        validator.validateClassType(this, UIElementType, UIElement);
        var uiElement = this.__entityFactory.create(UIElementType);
        uiElement.addComponent(this.__componentFactory.createFromPrimitive(new Text('')));
        // configure element image
        if (imageName) {
            var image = this.__validateImageExists(imageName);
            var displaySettings = new ImageDisplaySettings('none', null, null, image.width, image.height, image.width, image.height);
            uiElement.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)));
        }
        // configure display layers
        uiElement.forEachComponent(function (key, component) {
            if (component.isDrawable) {
                var displaySettings = component.getHandle().getDisplaySettings();
                if (displaySettings) {
                    displaySettings.displayLayer = config[uiElement.constructor.name] ?
                        config[uiElement.constructor.name].displayLayer : 'none';
                }
            }
        });
        return uiElement;
    };
    UIElementFactory.prototype.getContainer = function () { };

    return UIElementFactory;
});