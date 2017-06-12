define(['circuit-element', 'output-terminal'],
function (CircuitElement) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource() {
        CircuitElement.call(this);
        // initialize high
        this.outputTerminal.state = STATES.HIGH;
    };
    
    return PowerSource;
});