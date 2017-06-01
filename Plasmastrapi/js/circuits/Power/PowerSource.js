define([
    // Base
    'circuit-element',
    // Circuits
    'input-terminal',
    'output-terminal',
    'terminal-wire-anchor',
    'terminal-wire',
    // Components
    'sprite-component',
    // Data
    'position',
],
    function (CircuitElement, InputTerminal, OutputTerminal, TerminalWireAnchor, TerminalWire, SpriteComponent, Position) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(CircuitElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMargin = 35;
        var spriteComponent = this.getComponent(SpriteComponent);

        // output terminal
        this.outputTerminal = new OutputTerminal(new Position(0, -terminalOffsetMargin), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(this.outputTerminal, outputTerminalAnchor);

        // initialize high
        this.outputTerminal.state = this.outputTerminal.states.HIGH;
    };
    
    return PowerSource;
});