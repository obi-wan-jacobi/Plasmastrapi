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
    // Configs
    'circuits-config'
],
    function (CircuitElement, InputTerminal, OutputTerminal, TerminalWireAnchor, TerminalWire, SpriteComponent, Position, config) {

    // CLASS Gate
    Gate.prototype = Object.create(CircuitElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate(x, y) {
        // inherits from
        CircuitElement.call(this, x, y);

        // terminals
        var terminalOffsetMarginY = config.Gate.terminalOffsetMarginY;
        var spriteComponent = this.getComponent(SpriteComponent);

        // output terminal
        this.outputTerminal = new OutputTerminal(new Position(0, -terminalOffsetMarginY), this);
        var outputTerminalAnchor = new TerminalWireAnchor(new Position(0, -spriteComponent.height / 2), this);
        var outputTerminalWire = new TerminalWire(this.outputTerminal, outputTerminalAnchor);

        // input terminal
        this.inputTerminal = new InputTerminal(new Position(0, terminalOffsetMarginY), this);
        var inputTerminalAnchor = new TerminalWireAnchor(new Position(0, spriteComponent.height / 2), this);
        var inputTerminalWire = new TerminalWire(this.inputTerminal, inputTerminalAnchor);
    };
    
    return Gate;
});