define(['factory', 'component', 'dictionary', 'component-container', 'drawable-component-container', 'primitive', 'data-handle', 'polygon', 'utils'],
function (Factory, Component, Dictionary, ComponentContainer, DrawableComponentContainer, Primitive, DataHandle, Polygon, utils) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, Component);
        this.__emitterFactory = engine.getFactory('emitter-factory');
        this.__containers = new Dictionary(ComponentContainer);
        this.__drawableComponentContainer = new DrawableComponentContainer();
    };
    // private methods
    ComponentFactory.prototype.__getOrInitContainer = function (componentString) {
        // if container doesn't exist for this component type, create one
        var container = this.__containers.get(componentString);
        if (!container) {
            var ComponentType = utils.modules.require(componentString);
            var modulePrefix = componentString.split('-').slice(0, -1).join('-');
            var ContainerType = utils.modules.requireIfExists(`${modulePrefix}-container`);
            if (ContainerType !== null) {
                container = new ContainerType(ComponentType);
            } else {
                container = new ComponentContainer(ComponentType);
            }
            this.__containers.add(componentString, container);
        }
        return container;
    };
    // public methods
    ComponentFactory.prototype.create = function (componentString, args) {
        var ComponentType = utils.modules.require(componentString);
        var container = this.__getOrInitContainer(componentString);
        var component = this.__emitterFactory.create(ComponentType.bind.apply(ComponentType, [null].concat(args)));
        container.add(component);
        if (component.isDrawable) {
            this.__drawableComponentContainer.add(component);
        }
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandle) {
        utils.validator.validateInstanceType(this, dataHandle, DataHandle);
        var modulePrefix = utils.modules.getModulePrefix(dataHandle, 'Handle');
        var component = this.create(`${modulePrefix}-component`, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        utils.validator.validateInstanceType(this, primitive, Primitive);
        var modulePrefix = utils.modules.getModuleName(primitive);
        var componentString, HandleType, DisplaySettings;
        if (primitive instanceof Polygon) {
            componentString = 'polygon-component';
            HandleType = utils.modules.require('polygon-handle');
            DisplaySettings = utils.modules.require('polygon-display-settings');
        } else {
            componentString = `${modulePrefix}-component`;
            HandleType = utils.modules.require(`${modulePrefix}-handle`);
            DisplaySettings = utils.modules.require(`${modulePrefix}-display-settings`);
        }
        var component = this.create(componentString, [new HandleType(primitive, new DisplaySettings())]);
        return component;
    };
    ComponentFactory.prototype.getContainer = function (componentString) {
        return this.__getOrInitContainer(componentString);
    };
    ComponentFactory.prototype.getDrawableComponentContainer = function () {
        return this.__drawableComponentContainer;
    };

    return ComponentFactory;
});