define(['circuit-element', 'input-terminal', 'circuit-constants', 'validator'],
function (CircuitElement, InputTerminal, CIRCUITS, validator) {

    // CLASS LogicElement
    LogicElement.prototype = Object.create(CircuitElement.prototype);
    LogicElement.prototype.constructor = LogicElement;
    function LogicElement() {
        // inherits from
        CircuitElement.call(this);
        this.__inputs = [];
        this.__state = CIRCUITS.STATES.NOPOWER;
    };
    // public methods
    LogicElement.prototype.attachInput = function (inputTerminal) {
        validator.validateType(this, inputTerminal, InputTerminal);
        this.__inputs = this.__inputs.concat(input.getConnections());
    };
    LogicElement.prototype.updateState = function (inputState) {
        validator.throwMethodMustBeOverridden(this, 'updateState');
    };
    LogicElement.prototype.getState = function (state) {
        return this.__state;
    };
    LogicElement.prototype.setState = function (state) {
        this.__state = state;
        this.emit('onupdatestate');
    };
    
    return LogicElement;
});