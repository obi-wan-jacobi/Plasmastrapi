define(['factory', 'emitter-factory', 'dictionary', 'linked-list', 'primitive', 'data-handle', 'validator'],
function (Factory, EmitterFactory, Dictionary, LinkedList, Primitive, DataHandle, validator) {

    ComponentFactory.prototype = Object.create(Factory.prototype);
    ComponentFactory.prototype.constructor = ComponentFactory;
    function ComponentFactory(engine) {
        Factory.call(this, engine);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__containers = new Dictionary(LinkedList);
    };
    // private methods
    ComponentFactory.prototype.__getOrInitContainer = function (ComponentType) {
        // if container doesn't exist for this component type, create one
        var container = this.___containers.get(ComponentType);
        if (!container) {
            container = new LinkedList(ComponentType);
            this.__containers.add(ComponentType, container);
        }
        return container;
    };
    ComponentFactory.prototype.__onComponentDestroy = function (component) {
        this.__containers.get(component.constructor).remove(component);
    };
    // public methods
    ComponentFactory.prototype.create = function (ComponentType, args) {
        var container = this.__getOrInitContainer(ComponentType);
        var component = this.__emitterFactory.create(ComponentType.bind(null, args || []));
        container.add(component);
        container.addEventListener('ondestroy', this, this.__onComponentDestroy.bind(this, component));
        return component;
    };
    ComponentFactory.prototype.createFromDataHandle = function (dataHandle) {
        validator.validateType(dataHandle, DataHandle);
        var component = this.create(ComponentType, [dataHandle]);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        validator.validateType(primitive, Primitive);
        var self = this;
        var component = null;
        // Below: Ex. PrimitiveConstructorName --> primitive-constructor-name
        var modulePrefix = primitive.constructor.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        require(
            [
                modulePrefix + '-display-settings',
                modulePrefix + '-handle',
                modulePrefix + '-component'
            ],
            function (DisplaySettings, HandleType, ComponentType) {
                component = self.create(ComponentType, [new HandleType(primitive, new DisplaySettings())]);
            }
        );
        return component;
    };
    ComponentFactory.prototype.getContainer = function (ContainerType) {
        return this.___containers.get(ContainerType);
    };

    return ComponentFactory;
});