define(['circuit-element', 'container', 'circuits-constants', 'validator'],
function (CircuitElement, Container, constants, validator) {

    LogicElement.prototype = Object.create(CircuitElement.prototype);
    LogicElement.prototype.constructor = LogicElement;
    function LogicElement() {
        // inherits from
        CircuitElement.call(this);
        this.__outputTerminal = null;
        this.__inputTerminal = null;
        this.__inputs = new Container('input-terminal');
        this.__state = constants.STATES.NO_POWER;
        this.__isStateTransitionRequired = false;
        this.__stateTransition = null;
    };
    // public prototypal variables
    Object.defineProperties(LogicElement.prototype, {
        'inputTerminal': {
            get: function () {
                return this.__inputTerminal;
            }
        },
        'outputTerminal': {
            get: function () {
                return this.__outputTerminal;
            }
        },
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
        inputTerminal.setParent(this);
        this.__inputs.add(inputTerminal);
        this.__inputTerminal = inputTerminal;
    };
    LogicElement.prototype.attachOutput = function (outputTerminal) {
        validator.validateInstanceType(this, outputTerminal, 'output-terminal');
        outputTerminal.setParent(this);
        this.__outputTerminal = outputTerminal;
    };
    LogicElement.prototype.addTerminal = function (terminal) {
        if (validator.isInstanceOfType(terminal, 'input-terminal')) {
            this.attachInput(terminal);
        } else if (validator.isInstanceOfType(terminal, 'output-terminal')) {
            this.attachOutput(terminal);
        }
    };
    LogicElement.prototype.updateState = function (state) {
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
        if (this.__state !== state) {
            this.__isStateTransitionRequired = true;
            this.__stateTransition = state
        }
    };
    LogicElement.prototype.signalStateTransition = function () {
        if (this.__isStateTransitionRequired) {
            this.__isStateTransitionRequired = false;
            this.__state = this.__stateTransition;
            this.__stateTransition = null;
            this.emit('onstatechange', this.__state);
        }
    };

    return LogicElement;
});