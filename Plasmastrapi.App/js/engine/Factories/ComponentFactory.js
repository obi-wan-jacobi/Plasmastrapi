define(['factory', 'dictionary', 'component-container', 'drawable-component-container', 'primitive', 'utils'],
function (Factory, Dictionary, ComponentContainer, DrawableComponentContainer, Primitive, utils) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, engine);
        this.__primitiveFactory = null;
        this.__displaySettingsFactory = null;
        this.__dataHandleFactory = null;
        this.__emitterFactory = null;
        this.__containers = new Dictionary('component-container');
        this.__drawableComponentContainer = new DrawableComponentContainer();
    };
    // private methods
    ComponentFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__primitiveFactory = this.__engine.getFactory('primitive-factory');
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__dataHandleFactory = this.__engine.getFactory('data-handle-factory');
        this.__emitterFactory = this.__engine.getFactory('emitter-factory');
    };
    ComponentFactory.prototype.__getOrInitContainer = function (componentString) {
        // if container doesn't exist for this component type, create one
        var container = this.__containers.get(componentString);
        if (!container) {
            var ContainerType = utils.modules.requireIfExists(`${componentString}-container`);
            if (ContainerType !== null) {
                container = new ContainerType();
            } else {
                container = new ComponentContainer(componentString);
            }
            this.__containers.add(componentString, container);
        }
        return container;
    };
    // public methods
    ComponentFactory.prototype.create = function (componentString, args) {
        utils.validator.validateClassType(this, componentString, 'component');
        var container = this.__getOrInitContainer(componentString);
        var component = this.__emitterFactory.create(componentString, args);
        container.add(component);
        if (component.isDrawable) {
            this.__drawableComponentContainer.add(component);
        }
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandleString, args) {
        var dataHandle = this.__dataHandleFactory.create(dataHandleString, args);
        utils.validator.validateInstanceType(this, dataHandle, 'data-handle');
        var modulePrefix = utils.modules.getModulePrefix(dataHandle, 'Handle');
        var component = this.create(`${modulePrefix}-component`, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitiveString, args) {
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        var PrimitiveType = utils.modules.require(primitiveString);
        var primitive = new (Function.prototype.bind.apply(PrimitiveType, [null].concat(args)))();
        var modulePrefix = utils.modules.getBasePrimitiveModuleName(primitiveString);
        var displaySettings = new (utils.modules.require(`${modulePrefix}-display-settings`))();
        var component = this.createFromDataHandle(`${modulePrefix}-handle`, [primitive, displaySettings]);
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