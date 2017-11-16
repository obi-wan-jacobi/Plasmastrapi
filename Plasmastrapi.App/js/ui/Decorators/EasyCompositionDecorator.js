define(['decorator', 'utils', 'ui-config'],
function (Decorator, utils, config) {

    EasyCompositionDecorator.prototype = Object.create(Decorator.prototype);
    EasyCompositionDecorator.prototype.constructor = EasyCompositionDecorator;
    function EasyCompositionDecorator(engine) {
        Decorator.call(this, engine, EasyCompositionDecorator.prototype);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        // add private methods
        Decorator.prototype.addMethod.call(this, '__validateDisplaySettingsProperty');
        Decorator.prototype.addMethod.call(this, '__validateImageExists');
        Decorator.prototype.addMethod.call(this, '__setData');
        Decorator.prototype.addMethod.call(this, '__setDisplaySettings');
        Decorator.prototype.addMethod.call(this, '__setComponent');
        Decorator.prototype.addMethod.call(this, '__setEventListener');
        Decorator.prototype.addMethod.call(this, '__setImage');
        // add public methods
        Decorator.prototype.addMethod.call(this, 'set');
        Decorator.prototype.addMethod.call(this, 'getOrInitComponent');
    };
    // private methods
    EasyCompositionDecorator.prototype.__validateDisplaySettingsProperty = function (displaySettings, propertyName) {
        if (!displaySettings.hasOwnProperty(propertyName)) {
            utils.validator.throw(this, 'validateDisplaySettingsProperty',
                `${displaySettings.constructor.name} does not possess a ${propertyName} property`);
        }
    };
    EasyCompositionDecorator.prototype.__validateImageExists = function (imageName) {
        var image = this.__engine.getAssetMap().get(imageName);
        if (!image) {
            utils.validator.throw(this, 'validateImageExists', `No image named ${imageName} was found`);
        }
        return image;
    };
    EasyCompositionDecorator.prototype.__setData = function (typeString, args) {
        var DataType = utils.modules.require(typeString);
        var data = new (DataType.bind.apply(DataType, [null].concat(args)))();
        var modulePrefix = utils.modules.getBasePrimitiveModuleName(typeString);
        var component = this.getOrInitComponent(`${modulePrefix}-component`);
        component.setData(data);
    };
    EasyCompositionDecorator.prototype.__setDisplaySettings = function (typeString, argument) {
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
    EasyCompositionDecorator.prototype.__setComponent = function (componentString) {
        var component = this.__componentFactory.create(componentString);
        this.addComponent(component);
    };
    EasyCompositionDecorator.prototype.__setEventListener = function (componentEventString, callback) {
        var componentString = componentEventString.split(':')[0];
        var eventString = componentEventString.split(':')[1];
        var component = this.getOrInitComponent(componentString);
        var proxyCallback = component.removeEventListener(eventString, this);
        component.addEventListener(eventString, this, function () {
            proxyCallback.call(this);
            callback.call(this);
        });
    };
    EasyCompositionDecorator.prototype.__setImage = function (imageName) {
        var image = this.__validateImageExists(imageName);
        var displaySettings = this.getOrInitComponent('image-component').getDisplaySettings();
        displaySettings.sourceWidth = image.width;
        displaySettings.sourceHeight = image.height;
        displaySettings.destWidth = image.width;
        displaySettings.destHeight = image.height;
        this.getOrInitComponent('image-component').setData(image);
    };
    // public methods
    EasyCompositionDecorator.prototype.set = function (typeString, args, displaySettingsPartial) {
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
    EasyCompositionDecorator.prototype.getOrInitComponent = function (componentString) {
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

    return EasyCompositionDecorator;
});