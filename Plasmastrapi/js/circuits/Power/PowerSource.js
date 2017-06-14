define(['circuit-element', 'circuit-constants'],
function (CircuitElement, CIRCUITCONSTANTS) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource() {
        CircuitElement.call(this);
        // initialize high
        this.__state = CIRCUITCONSTANTS.STATES.HIGH;
    };
    
    return PowerSource;
});