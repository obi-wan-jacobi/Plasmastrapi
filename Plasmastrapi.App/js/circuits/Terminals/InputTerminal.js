define(['terminal', 'container', 'validator'],
function (Terminal, Container, validator) {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal() {
        Terminal.call(this);
        this.__connections = new Container('output-terminal');
    };
    // private methods
    InputTerminal.prototype.__toggleOutputTerminalEventListening = function (outputTerminal, actionString) {
        outputTerminal[`${actionString}EventListener`]('onstatechange', this.__parent, this.__parent.updateState);
    };
    // public methods
    InputTerminal.prototype.getConnections = function () {
        return this.__connections;
    };
    InputTerminal.prototype.addConnection = function (outputTerminal) {
        this.__connections.add(outputTerminal);
        this.__toggleOutputTerminalEventListening(outputTerminal, 'add');
        this.__parent.updateState(outputTerminal.getState());
    };
    InputTerminal.prototype.removeConnection = function (outputTerminal) {
        if (!this.__connections.remove(outputTerminal)) {
            validator.throw(this, 'removeConnection', `${outputTerminal.constructor.name} is not connected to this ${this.constructor.name}`);
        }
        this.__toggleOutputTerminalEventListening(outputTerminal, 'remove');
        this.__parent.updateState();
    };
    
    return InputTerminal;
});