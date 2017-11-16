define(['extended-factory', 'validator'],
function (ExtendedFactory, validator) {

    CircuitElementFactory.prototype = Object.create(ExtendedFactory.prototype);
    CircuitElementFactory.prototype.constructor = CircuitElementFactory;
    function CircuitElementFactory(engine) {
        ExtendedFactory.call(this, engine, 'entity-factory', 'circuit-element');
        this.__entityFactory = null;
    };

    return CircuitElementFactory;
});