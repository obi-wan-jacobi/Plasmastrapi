define(['wire-element', 'validator'],
function (WireElement, validator) {

    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire() {
        WireElement.call(this);
        this.__outputTerminal = null;
        this.__inputTerminal = null;
    };
    // private methods
    Wire.prototype.__ondestroy = function () {
        WireElement.prototype.__ondestroy.call(this);
        this.__inputTerminal.removeConnection(this.__outputTerminal);
    };
    Wire.prototype.__setInput = function (inputTerminal) {
        if (this.__inputTerminal) {
            validator.throw(this, 'setInput', `${this.constructor.name} has already received an input terminal`);
        }
        validator.validateInstanceType(this, inputTerminal, 'input-terminal');
        this.__inputTerminal = inputTerminal;
        if (this.__outputTerminal) {
            this.__inputTerminal.addConnection(this.__outputTerminal);
        }
    };
    Wire.prototype.__setOutput = function (outputTerminal) {
        if (this.__outputTerminal) {
            validator.throw(this, 'setInput', `${this.constructor.name} has already received an output terminal`);
        }
        validator.validateInstanceType(this, outputTerminal, 'output-terminal');
        this.__outputTerminal = outputTerminal;
        // initialize pass-through event handling
        this.__outputTerminal.addEventListener('onstatechange', this, this.__$onstatechange);
        this.emit('onstatechange', this.outputTerminal.getState());
        if (this.__inputTerminal) {
            this.__inputTerminal.addConnection(this.__outputTerminal);
        }
    };
    // public prototypal variables
    Object.defineProperties(Wire.prototype, {
        'inputTerminal': {
            get: function () {
                return this.__inputTerminal;
            }
        },
        'outputTerminal': {
            get: function () {
                return this.__outputTerminal;
            }
        }
    });
    // public methods
    Wire.prototype.connectTail = function (terminal) {
        this.connectTerminal(terminal);
        WireElement.prototype.connectTail.call(this, terminal);
    };
    Wire.prototype.connectHead = function (terminal) {
        this.connectTerminal(terminal);
        WireElement.prototype.connectHead.call(this, terminal);
    };
    Wire.prototype.connectTerminal = function (terminal) {
        validator.validateInstanceType(this, terminal, 'terminal');
        if (validator.isInstanceOfType(terminal, 'input-terminal')) {
            this.__setInput(terminal);
        } else if (validator.isInstanceOfType(terminal, 'output-terminal')) {
            this.__setOutput(terminal);
        } else {
            validator.throw(this, 'connectTerminal', `Argument ${terminal.constructor.name} must be an input or output terminal`);
        }
    };

    return Wire;
});