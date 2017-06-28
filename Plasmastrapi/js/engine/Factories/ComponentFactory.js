define(['factory', 'emitter-factory', 'dictionary', 'linked-list', 'primitive', 'validator'],
function (Factory, EmitterFactory, Dictionary, LinkedList, Primitive, validator) {

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
    // public methods
    ComponentFactory.prototype.create = function (ComponentType, args) {
        var container = this.__getOrInitContainer(ComponentType);
        var component = this.__emitterFactory.create(Function.prototype.bind.apply(ComponentType, [null].concat(args || [])));
        container.add(component);
        return component;
    };
    ComponentFactory.prototype.createFromPrimitive = function (primitive) {
        validator.validateType(primitive, Primitive);
        var self = this;
        var component = null;
        var modulePrefix = primitive.constructor.name.toLowerCase();
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