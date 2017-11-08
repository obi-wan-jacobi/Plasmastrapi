define(['factory', 'circuit-element', 'pose', 'polygon', 'vertex', 'pick-handle', 'validator'],
function (Factory, CircuitElement, Pose, Polygon, Vertex, PickHandle, validator) {

    CircuitElementFactory.prototype = Object.create(Factory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        Factory.call(this, CircuitElement);
        this.__componentFactory = engine.getFactory('component-factory');
        this.__entityFactory = engine.getFactory('entity-factory');
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