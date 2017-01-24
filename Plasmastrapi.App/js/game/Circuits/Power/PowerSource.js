define(["../Base/CircuitElement"], function (CircuitElement) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMargin = 35;

        // output terminal
        var outputTerminal = new OutputTerminal(new Geometry.Position(0, -terminalOffsetMargin), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(outputTerminal, outputTerminalAnchor);
        // configure dependencies
        this.addChild(outputTerminal);
        this.addChild(outputTerminalAnchor);
        this.addChild(outputTerminalWire);

        // input terminal
        var inputTerminal = new InputTerminal(new Geometry.Position(0, terminalOffsetMargin), this);
        var inputTerminalAnchor = new TerminalWireAnchor(new Geometry.Position(0, spriteComponent.height / 2), this);
        var inputTerminalWire = new TerminalWire(inputTerminal, inputTerminalAnchor);
        // configure dependencies
        this.addChild(inputTerminal);
        this.addChild(inputTerminalAnchor);
        this.addChild(inputTerminalWire);
    };
    
    return PowerSource;
});