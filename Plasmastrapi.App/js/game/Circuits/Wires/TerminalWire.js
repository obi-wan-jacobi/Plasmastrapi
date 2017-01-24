define(["./Wire"], function (Wire) {

    // CLASS TerminalWire
    // forms the inner wire between a circuit element and one of its terminals
    TerminalWire.prototype = Object.create(Wire.prototype);
    TerminalWire.prototype.constructor = TerminalWire;
    function TerminalWire(terminalWireAnchor, terminal) {
        Wire.call(this, terminalWireAnchor, terminal);
    };
    
    return TerminalWire;
});