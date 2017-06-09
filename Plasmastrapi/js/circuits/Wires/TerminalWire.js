define(['wire-element'],
function (WireElement) {

    // CLASS TerminalWire
    // forms the inner wire between a circuit element and one of its terminals
    TerminalWire.prototype = Object.create(WireElement.prototype);
    TerminalWire.prototype.constructor = TerminalWire;
    function TerminalWire(terminalWireAnchor, terminal) {
        WireElement.call(this, terminalWireAnchor, terminal);
        this.addParent(terminal);
    };
    
    return TerminalWire;
});