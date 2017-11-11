define(['circuit-element', 'circuits-config', 'validator'],
function (CircuitElement, config, validator) {

    // CLASS LogicElement
    LogicElement.prototype = Object.create(CircuitElement.prototype);
    LogicElement.prototype.constructor = LogicElement;
    function LogicElement() {
        // inherits from
        CircuitElement.call(this);
        this.__inputs = [];
        this.__state = config.constants.STATES.NOPOWER;
    };
    // public methods
    LogicElement.prototype.attachInput = function (inputTerminal) {
        validator.validateInstanceType(this, inputTerminal, InputTerminal);
        inputTerminal.addParent(this);
        this.__inputs = this.__inputs.concat(input.getConnections());
    };
    LogicElement.prototype.attachOutput = function (outputTerminal) {
        validator.validateInstanceType(this, outputTerminal, OutputTerminal);
        outputTerminal.addParent(this);
    };
    LogicElement.prototype.updateState = function (inputState) {
        validator.throwMethodMustBeOverridden(this, 'updateState');
    };
    LogicElement.prototype.getState = function (state) {
        return this.__state;
    };
    LogicElement.prototype.setState = function (state) {
        if (!(state >= 0 && state <= 1)) {
            validator.throw(this, 'setState', `State cannot be set to value ${state}`);
        }
        this.__state = state;
        this.emit('onstatechange');
    };
    
    return LogicElement;
});