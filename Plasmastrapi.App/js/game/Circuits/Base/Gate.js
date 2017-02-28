define(["../Base/CircuitElement", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry",
"../Terminals/OutputTerminal", "../Terminals/InputTerminal", "../Terminals/TerminalWireAnchor", "../Wires/TerminalWire"],
function (CircuitElement, $, Geometry, OutputTerminal, InputTerminal, TerminalWireAnchor, TerminalWire) {

    // CLASS Gate
    Gate.prototype = Object.create(CircuitElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMarginY = 35;
        var spriteComponent = this.getComponent($.SpriteComponent);

        // output terminal
        var outputTerminal = new OutputTerminal(new Geometry.Position(0, -terminalOffsetMarginY), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(outputTerminal, outputTerminalAnchor);

        // input terminal
        var inputTerminal = new InputTerminal(new Geometry.Position(0, terminalOffsetMarginY), this);
        var inputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, spriteComponent.height / 2), this);
        var inputTerminalWire = new TerminalWire(inputTerminal, inputTerminalAnchor);
    };
    
    return Gate;
});