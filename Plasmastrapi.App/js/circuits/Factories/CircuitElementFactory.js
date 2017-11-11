define(['factory', 'validator'],
function (Factory, validator) {

    CircuitElementFactory.prototype = Object.create(Factory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = null;
        this.__entityFactory = null;
    };
    // private methods
    CircuitElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__entityFactory = this.__engine.getFactory('entity-factory');
    };
    // public methods
    CircuitElementFactory.prototype.create = function (elementString) {
        var circuitElement = this.__entityFactory.create(elementString);
        validator.validateInstanceType(this, circuitElement, 'circuit-element');
        return circuitElement;
    };
    CircuitElementFactory.prototype.getContainer = function () { };

    return CircuitElementFactory;
});