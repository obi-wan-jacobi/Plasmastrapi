define(['circuit-element', 'container', 'circuits-constants', 'validator'],
function (CircuitElement, Container, constants, validator) {

    LogicElement.prototype = Object.create(CircuitElement.prototype);
    LogicElement.prototype.constructor = LogicElement;
    function LogicElement() {
        CircuitElement.call(this);
        this.__outputs = new Container('output-terminal');
        this.__inputs = new Container('input-terminal');
        this.__currentState = constants.STATES.NO_POWER;
        this.__isStateTransitionRequired = false;
        this.__nextState = null;
    };
    // public prototypal variables
    Object.defineProperties(LogicElement.prototype, {
        'inputs': {
            get: function () {
                return this.__inputs;
            }
        },
        'outputs': {
            get: function () {
                return this.__outputs;
            }
        },
        'isPowered': {
            get: function () {
                return this.__currentState > constants.STATES.NO_POWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__currentState === constants.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__currentState === constants.STATES.LOW;
            }
        }
    });
    // public methods
    LogicElement.prototype.attachInput = function (inputTerminal) {
        inputTerminal.setParent(this);
        this.__inputs.add(inputTerminal);
    };
    LogicElement.prototype.attachOutput = function (outputTerminal) {
        outputTerminal.setParent(this);
        this.__outputs.add(outputTerminal);
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
    LogicElement.prototype.getState = function () {
        return this.__currentState;
    };
    LogicElement.prototype.setState = function (state) {
        validator.validateInstanceType(this, state, 'number');
        if (!(state >= constants.STATES.NO_POWER && state <= constants.STATES.HIGH)) {
            validator.throw(this, 'setState', `State cannot be set to value ${state}`);
        } else if (this.__currentState !== state) {
            this.__isStateTransitionRequired = true;
            this.__nextState = state
        }
    };
    LogicElement.prototype.signalStateTransition = function () {
        if (this.__isStateTransitionRequired) {
            this.__isStateTransitionRequired = false;
            this.__currentState = this.__nextState;
            this.__nextState = null;
            this.emit('onstatechange', this.__currentState);
        }
    };

    return LogicElement;
});