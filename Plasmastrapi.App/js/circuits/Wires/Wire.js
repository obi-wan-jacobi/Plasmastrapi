define(['wire-element', 'line-component'],
function (WireElement, LineComponent) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        validator.validateInstanceType(this, outputTerminal, 'output-terminal');
        validator.validateInstanceType(this, inputTerminal, 'input-terminal');
        this.outputTerminal = outputTerminal;
        this.inputTerminal = inputTerminal;
        // inherits from
        WireElement.call(this, outputTerminal, inputTerminal);
        // initialize dependencies
        this.addDependency(this.inputTerminal);
        this.addDependency(this.outputTerminal);
        // initialize pass-through event handling
        this.outputTerminal.addEventListener('onstatechange', this, this.__$onstatechange);
        // connect terminals
        this.inputTerminal.addConnection(this.outputTerminal);
    };
    // private methods
    Wire.prototype.__ondestroy = function () {
        this.inputTerminal.removeConnection(this.outputTerminal);
    };

    return Wire;
});