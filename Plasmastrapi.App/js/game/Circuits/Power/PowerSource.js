define(["../Base/CircuitElement", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry",
"../Terminals/OutputTerminal", "../Terminals/InputTerminal", "../Terminals/TerminalWireAnchor", "../Wires/TerminalWire"],
function (CircuitElement, $, Geometry, OutputTerminal, InputTerminal, TerminalWireAnchor, TerminalWire) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMargin = 35;
        var spriteComponent = this.getComponent($.SpriteComponent);

        // output terminal
        this.outputTerminal = new OutputTerminal(new Geometry.Position(0, -terminalOffsetMargin), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(this.outputTerminal, outputTerminalAnchor);

        // initialize high
        this.outputTerminal.state = this.outputTerminal.states.HIGH;
    };
    
    return PowerSource;
});