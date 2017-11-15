define(['circuit-element', 'container', 'circuits-constants', 'validator'],
function (CircuitElement, Container, constants, validator) {

    // CLASS LogicElement
    LogicElement.prototype = Object.create(CircuitElement.prototype);
    LogicElement.prototype.constructor = LogicElement;
    function LogicElement() {
        // inherits from
        CircuitElement.call(this);
        this.__inputs = new Container('input-terminal');
        this.__state = constants.STATES.NO_POWER;
    };
    // public prototypal variables
    Object.defineProperties(LogicElement.prototype, {
        'isPowered': {
            get: function () {
                return this.__state > constants.STATES.NO_POWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__state === constants.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__state === constants.STATES.LOW;
            }
        }
    });
    // public methods
    LogicElement.prototype.attachInput = function (inputTerminal) {
        validator.validateInstanceType(this, inputTerminal, 'input-terminal');
        inputTerminal.addParent(this);
        this.__inputs.add(inputTerminal);
    };
    LogicElement.prototype.attachOutput = function (outputTerminal) {
        validator.validateInstanceType(this, outputTerminal, 'output-terminal');
        outputTerminal.addParent(this);
    };
    LogicElement.prototype.addTerminal = function (terminal) {
        if (validator.isInstanceOfType(terminal, 'input-terminal')) {
            this.attachInput(terminal);
        } else if (validator.isInstanceOfType(terminal, 'output-terminal')) {
            this.attachOutput(terminal);
        }
    };
    LogicElement.prototype.updateState = function (inputState) {
        validator.throwMethodMustBeOverridden(this, 'updateState');
    };
    LogicElement.prototype.getState = function (state) {
        return this.__state;
    };
    LogicElement.prototype.setState = function (state) {
        validator.validateInstanceType(this, state, 'number');
        if (!(state >= constants.STATES.NO_POWER && state <= constants.STATES.HIGH)) {
            validator.throw(this, 'setState', `State cannot be set to value ${state}`);
        }
        this.__state = state;
        this.emit('onstatechange', this.__state);
    };
    
    return LogicElement;
});