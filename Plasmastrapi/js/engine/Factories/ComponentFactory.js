define(['factory', 'emitter-factory', 'dictionary', 'linked-list', 'drawable-component-container', 'primitive', 'data-handle', 'validator'],
function (Factory, EmitterFactory, Dictionary, LinkedList, DrawableComponentContainer, Primitive, DataHandle, validator) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, engine);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__containers = new Dictionary(LinkedList);
        this.__drawableComponentContainer = new DrawableComponentContainer();
    };
    // private methods
    ComponentFactory.prototype.__getOrInitContainer = function (ComponentType) {
        // if container doesn't exist for this component type, create one
        var container = this.__containers.get(ComponentType);
        if (!container) {
            container = new LinkedList(ComponentType);
            this.__containers.add(ComponentType, container);
        }
        return container;
    };
    ComponentFactory.prototype.__onComponentDestroy = function (component) {
        this.__containers.get(component.constructor).remove(component);
        if (component.isDrawable) {
            this.__drawableComponentContainer.remove(component);
        }
    };
    // public methods
    ComponentFactory.prototype.create = function (ComponentType, args) {
        var container = this.__getOrInitContainer(ComponentType);
        var component = this.__emitterFactory.create(ComponentType.bind.apply(ComponentType, [null].concat(args)));
        container.add(component);
        component.addEventListener('ondestroy', this, this.__onComponentDestroy.bind(this, component));
        if (component.isDrawable) {
            this.__drawableComponentContainer.add(component);
        }
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandle) {
        validator.validateType(this, dataHandle, DataHandle);
        var component = this.create(ComponentType, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        validator.validateType(this, primitive, Primitive);
        // Below: Ex. PrimitiveConstructorName --> primitive-constructor-name
        var modulePrefix = primitive.constructor.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        // Modules can be required 'dynamically' only because they've been pre-loaded by the ModuleLoader
        var ComponentType = require(modulePrefix + '-component');
        var HandleType = require(modulePrefix + '-handle');
        var DisplaySettings = require(modulePrefix + '-display-settings');
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