define(['wire-element', 'input-terminal', 'output-terminal', 'line-component'],
function (WireElement, InputTerminal, OutputTerminal, LineComponent) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        validator.validateType(this, outputTerminal, OutputTerminal);
        validator.validateType(this, inputTerminal, InputTerminal);
        this.outputTerminal = outputTerminal;
        this.inputTerminal = inputTerminal;
        // inherits from
        WireElement.call(this, outputTerminal, inputTerminal);
        // events
        this.registerEvents(
            'onstatechange'
        );
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