define(['terminal', 'output-terminal'],
function (Terminal, OutputTerminal) {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal(circuitElement) {
        // inherits from
        Terminal.call(circuitElement);
        this.__connections = [];
        circuitElement.attachInput(this);
    };
    // public methods
    InputTerminal.prototype.getConnections = function () {
        return this.__connections;
    };
    InputTerminal.prototype.addConnection = function (outputTerminal) {
        if (!(outputTerminal instanceof OutputTerminal)) {
            throw new Error(this.constructor.name + ':addConnection - ' + outputTerminal.constructor.name + ' must be an instance of ' + OutputTerminal.name);
        }
        this.__connections.push(outputTerminal);
        outputTerminal.addEventListener('onstatechange', this.__parent, this.__parent.updateState);
        this.__parent.updateState(outputTerminal.getState());
    };
    InputTerminal.prototype.removeConnection = function (outputTerminal) {
        var connectionIndex = this.__connections.indexOf(outputTerminal);
        if (!(connectionIndex >= 0)) {
            throw new Error(this.constructor.name + ':removeConnection - ' + outputTerminal.constructor.name + ' is not connected to this input terminal');
        }
        var terminalToDisconnect = this.__connections[connectionIndex];
        this.__connections.splice(connectionIndex, 1);
        terminalToDisconnect.removeEventListener('onstatechange', this.__parent, this.__parent.updateState);
        this.__parent.updateState(terminalToDisconnect.STATES.NOPOWER);
    };
    
    return InputTerminal;
});