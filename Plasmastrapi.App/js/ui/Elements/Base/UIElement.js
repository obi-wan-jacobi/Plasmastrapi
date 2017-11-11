define(['entity', 'primitive', 'display-settings', 'utils'],
function (Entity, Primitive, DisplaySettings, utils) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(engine) {
        Entity.call(this);
        this.__engine = engine;
    };
    // private methods
    UIElement.prototype.__validateDisplaySettingsProperty = function (displaySettings, propertyName) {
        if (!displaySettings.hasOwnProperty(propertyName)) {
            utils.validator.throw(this, 'validateDisplaySettingsProperty',
                `${displaySettings.constructor.name} does not possess a ${propertyName} property`);
        }
    };
    UIElement.prototype.__validateImageExists = function (imageName) {
        var image = this.__engine.getAssetMap().get(imageName);
        if (!image) {
            utils.validator.throw(this, 'validateImageExists', `No image named ${imageName} was found`);
        }
        return image;
    };
    UIElement.prototype.__setData = function (DataType, args) {
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        var data = new (DataType.bind.apply(DataType, [null].concat(args)))();
        var baseClass = data;
        if (Object.getPrototypeOf(data).constructor.name === (function () { }).constructor.name) {
            baseClass = function pick() { };
        }
        if (utils.validator.isInstanceOfType(data, 'primitive')) {
            while (Object.getPrototypeOf(baseClass).constructor.name !== Primitive.name) {
                baseClass = Object.getPrototypeOf(baseClass);
            }
        }
        var modulePrefix = utils.modules.getModuleName(baseClass);
        var component = this.getComponent(`${modulePrefix}-component`);
        component.getHandle().setData(data);
    };
    UIElement.prototype.__setDisplaySettings = function (Type, argument) {
        utils.validator.validateObject(argument);
        var modulePrefix = utils.modules.getModulePrefix(Type, 'DisplaySettings');
        var displaySettings = this.getComponent(`${modulePrefix}-component`).getDisplaySettings();
        for (var propertyName in argument) {
            if (argument.hasOwnProperty(propertyName)) {
                this.__validateDisplaySettingsProperty(displaySettings, propertyName);
                displaySettings[propertyName] = argument[propertyName];
            }
        }
    };
    UIElement.prototype.__setPickData = function (pickString, fnAction) {
        this.getComponent('pick-component').setData(fnAction);
    };
    UIElement.prototype.__setImage = function (imageName) {
        var image = this.__validateImageExists(imageName);
        var displaySettings = this.getComponent('image-component').getDisplaySettings();
        displaySettings.sourceWidth = image.width;
        displaySettings.sourceHeight = image.height;
        displaySettings.destWidth = image.width;
        displaySettings.destHeight = image.height;
        this.getComponent('image-component').setData(image);
    };
    // public methods
    UIElement.prototype.set = function (typeString, args) {
        if (typeString.includes('pick')) {
            return this.__setPickData(typeString, args);
        }
        if (typeString === 'image') {
            return this.__setImage(args);
        }
        var Type = utils.modules.require(typeString);
        if (Type.prototype instanceof Primitive) {
            return this.__setData(Type, args);
        } else if (Type.prototype instanceof DisplaySettings) {
            return this.__setDisplaySettings(Type, args);
        }
        utils.validator.throw(this, 'set', `No module named ${typeString} was found`);
    };
    UIElement.prototype.contains = function (entity) {
        utils.validator.validateInstanceType(this, entity, 'entity');
        var position = entity.getComponent('pose-component')
            .getHandle()
            .getPosition();
        return this.getComponent('polygon-component')
            .getHandle()
            .checkPointCollision(position);
    };

    return UIElement;
});