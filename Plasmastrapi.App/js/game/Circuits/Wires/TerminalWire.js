define(["../Base/CircuitElement"], function (CircuitElement) {

    // CLASS TerminalWire
    // forms the inner wire between a circuit element and one of its terminals
    TerminalWire.prototype = Object.create(CircuitElement.prototype);
    TerminalWire.prototype.constructor = TerminalWire;
    function TerminalWire(terminalWireAnchor, terminal, lineDisplayOptions) {

        CircuitElement.call(this);

        var lineComponent = new Components.LineComponent(
            terminalWireAnchor.getComponent(Components.PoseComponent),
            terminal.getComponent(Components.PoseComponent),
            lineDisplayOptions //new Graphics.LineStyleTemplate('#FFFFFF', 2)
        );

        this.addComponent(lineComponent);
    };
    
    return TerminalWire;
});