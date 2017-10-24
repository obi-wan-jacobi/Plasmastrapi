define(['factory', 'circuit-element', 'component-factory', 'entity-factory', 'pose', 'mesh', 'vertex', 'pick-handle', 'validator'],
function (Factory, CircuitElement, ComponentFactory, EntityFactory, Pose, Mesh, Vertex, PickHandle, validator) {

    CircuitElementFactory.prototype = Object.create(Factory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        Factory.call(this, CircuitElement);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__entityFactory = engine.getFactory(EntityFactory);
    };
    // public methods
    CircuitElementFactory.prototype.create = function (Type) {
        var circuitElement = this.__entityFactory.create(Type);
        validator.validateInstanceType(this, circuitElement, CircuitElement);
        // add components
        circuitElement.addComponent(this.__componentFactory.createFromPrimitive(new Pose()));
        circuitElement.addComponent(this.__componentFactory.createFromPrimitive(new Mesh([new Vertex()])));
        circuitElement.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { })));
        return circuitElement;
    };
    CircuitElementFactory.prototype.getContainer = function () { };

    return CircuitElementFactory;
});