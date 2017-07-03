define(['factory', 'circuit-element', 'component-factory', 'entity-factory', 'pose', 'mesh', 'vertex', 'keyboard-handle', 'mouse-handle', 'pick-handle', 'validator'],
function (Factory, CircuitElement, ComponentFactory, EntityFactory, Pose, Mesh, Vertex, KeyboardHandle, MouseHandle, PickHandle, validator) {

    CircuitElementFactory.prototype = Object.create(Factory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__entityFactory = engine.getFactory(EntityFactory);
    };
    // public methods
    CircuitElementFactory.prototype.create = function (Type) {
        var circuitElement = this.__entityFactory.create(Type);
        validator.validateType(this, circuitElement, CircuitElement);
        // add components
        circuitElement.addComponent(this.__componentFactory.createFromPrimitive(new Pose())); // pose
        circuitElement.addComponent(this.__componentFactory.createFromPrimitive(new Mesh([new Vertex()]))); // mesh
        circuitElement.addComponent(this.__componentFactory.createFromDataHandle(new KeyboardHandle())); // keyboard
        circuitElement.addComponent(this.__componentFactory.createFromDataHandle(new MouseHandle())); // mouse
        circuitElement.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { }))); // pick
        return circuitElement;
    };
    CircuitElementFactory.prototype.getContainer = function () { };

    return CircuitElementFactory;
});