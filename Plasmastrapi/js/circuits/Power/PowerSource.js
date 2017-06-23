define(['circuit-element', 'circuit-constants'],
function (CircuitElement, CIRCUITS) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource() {
        CircuitElement.call(this);
        // initialize high
        this.__state = CIRCUITS.STATES.HIGH;
    };
    
    return PowerSource;
});