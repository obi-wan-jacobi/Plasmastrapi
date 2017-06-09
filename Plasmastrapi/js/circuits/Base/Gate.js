define(['circuit-element', 'input-terminal', 'output-terminal'],
function (CircuitElement, InputTerminal, OutputTerminal) {

    // CLASS Gate
    Gate.prototype = Object.create(CircuitElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate(inputTerminal, outputTerminal) {
        CircuitElement.call(this);
        this.inputTerminal = inputTerminal;
        this.outputTerminal = outputTerminal;
    };
    
    return Gate;
});