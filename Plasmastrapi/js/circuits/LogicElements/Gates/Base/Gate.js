define(['logic-element', 'input-terminal', 'output-terminal'],
function (LogicElement, InputTerminal, OutputTerminal) {

    // CLASS Gate
    Gate.prototype = Object.create(LogicElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate() {
        LogicElement.call(this);
    };
    
    return Gate;
});