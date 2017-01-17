define(["./LabElement"], function (LabElement) {

    // CLASS TerminalWire
    // forms the inner wire between a circuit element and one of its terminals
    TerminalWire.prototype = Object.create(LabElement.prototype);
    TerminalWire.prototype.constructor = TerminalWire;
    function TerminalWire(terminalWireAnchor, terminal, lineDisplayOptions) {

        LabElement.call(this);

        var lineComponent = new Components.LineComponent(
            terminalWireAnchor.getComponent(Components.PoseComponent),
            terminal.getComponent(Components.PoseComponent),
            lineDisplayOptions //new Graphics.LineStyleTemplate('#FFFFFF', 2)
        );

        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.GAMEENTITIES);

        this.addComponent(lineComponent);
        this.addComponent(drawableComponent);
    };
    
    return TerminalWire;
});