define(['circuit-element', 'output-terminal'],
function (CircuitElement, OutputTerminal) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource(outputTerminal) {
        CircuitElement.call(this);

        // output terminal
        this.outputTerminal = outputTerminal

        // initialize high
        this.outputTerminal.state = this.outputTerminal.states.HIGH;
    };
    
    return PowerSource;
});