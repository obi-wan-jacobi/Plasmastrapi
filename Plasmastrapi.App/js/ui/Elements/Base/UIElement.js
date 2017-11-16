define(['entity', 'primitive', 'display-settings', 'utils', 'ui-config'],
function (Entity, Primitive, DisplaySettings, utils, config) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(engine) {
        Entity.call(this);
        this.__engine = engine;
        this.__componentFactory = null;
    };
    // private methods
    UIElement.prototype.__oninit = function () {
        Entity.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
    };
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
    UIElement.prototype.__setData = function (typeString, args) {
        var DataType = utils.modules.require(typeString);
        var data = new (DataType.bind.apply(DataType, [null].concat(args)))();
        var modulePrefix = utils.modules.getBasePrimitiveModuleName(typeString);
        var component = this.getOrInitComponent(`${modulePrefix}-component`);
        component.setData(data);
    };
    UIElement.prototype.__setDisplaySettings = function (typeString, argument) {
        utils.validator.validateObject(this, argument);
        var modulePrefix = utils.modules.getBasePrimitiveModuleName(typeString);
        var displaySettings = this.getOrInitComponent(`${modulePrefix}-component`).getDisplaySettings();
        for (var propertyName in argument) {
            if (argument.hasOwnProperty(propertyName)) {
                this.__validateDisplaySettingsProperty(displaySettings, propertyName);
                displaySettings[propertyName] = argument[propertyName];
            }
        }
    };
    UIElement.prototype.__setComponent = function (componentString) {
        var component = this.__componentFactory.create(componentString);
        this.addComponent(component);
    };
    UIElement.prototype.__setEventListener = function (componentEventString, callback) {
        var componentString = componentEventString.split(':')[0];
        var eventString = componentEventString.split(':')[1];
        var component = this.getOrInitComponent(componentString);
        var proxyCallback = component.removeEventListener(eventString, this);
        component.addEventListener(eventString, this, function () {
            proxyCallback.call(this);
            callback.call(this);
        });
    };
    UIElement.prototype.__setImage = function (imageName) {
        var image = this.__validateImageExists(imageName);
        var displaySettings = this.getOrInitComponent('image-component').getDisplaySettings();
        displaySettings.sourceWidth = image.width;
        displaySettings.sourceHeight = image.height;
        displaySettings.destWidth = image.width;
        displaySettings.destHeight = image.height;
        this.getOrInitComponent('image-component').setData(image);
    };
    // public methods
    UIElement.prototype.set = function (typeString, args, displaySettingsPartial) {
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        if (typeString.includes(':')) {
            return this.__setEventListener(typeString, args[0]);
        }
        if (typeString.includes('component')) {
            return this.__setComponent(typeString);
        };
        if (typeString === 'image') {
            return this.__setImage(args[0]);
        }
        if (args) {
            this.__setData(typeString, args);
        }
        if (displaySettingsPartial) {
            this.__setDisplaySettings(typeString, displaySettingsPartial);
        }
    };
    UIElement.prototype.getOrInitComponent = function (componentString) {
        var component = this.getComponent(componentString);
        if (component) {
            return component;
        }
        component = utils.modules.require(componentString);
        var modulePrefix = utils.modules.getModulePrefix(component, 'Component');
        var DisplaySettingsType = utils.modules.requireIfExists(`${modulePrefix}-display-settings`);
        if (DisplaySettingsType) {
            var displayLayer = config[this.constructor.name] ? config[this.constructor.name].displayLayer : 'none';
            var displaySettings = new DisplaySettingsType(displayLayer);
            component = this.__componentFactory.createFromDataHandle(`${modulePrefix}-handle`, [null, displaySettings]);
        } else {
            if (!utils.modules.requireIfExists(`${modulePrefix}-handle`)) {
                component = this.__componentFactory.create(`${modulePrefix}-component`);
            } else {
                component = this.__componentFactory.createFromDataHandle(`${modulePrefix}-handle`);
            }
        }
        this.addComponent(component);
        return component;
    };

    return UIElement;
});