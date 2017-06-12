define(['circuit-element', 'input-terminal', 'output-terminal'],
function (CircuitElement, InputTerminal, OutputTerminal) {

    // CLASS Gate
    Gate.prototype = Object.create(CircuitElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate() {
        CircuitElement.call(this);
    };
    
    return Gate;
});