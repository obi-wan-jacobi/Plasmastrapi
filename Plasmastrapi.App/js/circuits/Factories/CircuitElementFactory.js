define(['factory', 'circuit-element', 'component-factory', 'entity-factory', 'pose', 'polygon', 'vertex', 'pick-handle', 'validator'],
function (Factory, CircuitElement, ComponentFactory, EntityFactory, Pose, Polygon, Vertex, PickHandle, validator) {

    CircuitElementFactory.prototype = Object.create(Factory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        Factory.call(this, CircuitElement);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__entityFactory = engine.getFactory(EntityFactory);
    };
    // public methods
    CircuitElementFactory.prototype.create = function (Type) {
        validator.validateClassType(this, Type, CircuitElement);
        var circuitElement = this.__entityFactory.create(Type);
        return circuitElement;
    };
    CircuitElementFactory.prototype.getContainer = function () { };

    return CircuitElementFactory;
});