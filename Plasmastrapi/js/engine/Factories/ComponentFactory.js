define(['factory', 'component', 'emitter-factory', 'dictionary', 'component-container', 'drawable-component-container', 'primitive', 'data-handle', 'utils'],
function (Factory, Component, EmitterFactory, Dictionary, ComponentContainer, DrawableComponentContainer, Primitive, DataHandle, utils) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, Component);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__containers = new Dictionary(ComponentContainer);
        this.__drawableComponentContainer = new DrawableComponentContainer();
    };
    // private methods
    ComponentFactory.prototype.__getOrInitContainer = function (ComponentType) {
        // if container doesn't exist for this component type, create one
        var container = this.__containers.get(ComponentType);
        if (!container) {
            try {
                var modulePrefix = utils.modules.getModulePrefix(ComponentType);
                var ContainerType = utils.modules.require(modulePrefix + '-container');
                container = new ContainerType(ComponentType);
            } catch(e) {
                container = new ComponentContainer(ComponentType);
            }
            this.__containers.add(ComponentType, container);
        }
        return container;
    };
    // public methods
    ComponentFactory.prototype.create = function (ComponentType, args) {
        var container = this.__getOrInitContainer(ComponentType);
        var component = this.__emitterFactory.create(ComponentType.bind.apply(ComponentType, [null].concat(args)));
        container.add(component);
        if (component.isDrawable) {
            this.__drawableComponentContainer.add(component);
        }
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandle) {
        utils.validator.validateType(this, dataHandle, DataHandle);
        var modulePrefix = utils.modules.getModulePrefix(dataHandle, 'Handle');
        var ComponentType = utils.modules.require(modulePrefix + '-component'); 
        var component = this.create(ComponentType, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        utils.validator.validateType(this, primitive, Primitive);
        var modulePrefix = utils.modules.getModulePrefix(primitive, null);
        var ComponentType = utils.modules.require(modulePrefix + '-component');
        var HandleType = utils.modules.require(modulePrefix + '-handle');
        var DisplaySettings = utils.modules.require(modulePrefix + '-display-settings');
        var component = this.create(ComponentType, [new HandleType(primitive, new DisplaySettings())]);
        return component;
    };
    ComponentFactory.prototype.getContainer = function (ComponentType) {
        return this.__getOrInitContainer(ComponentType);
    };
    ComponentFactory.prototype.getDrawableComponentContainer = function () {
        return this.__drawableComponentContainer;
    };

    return ComponentFactory;
});