define(['extended-factory', 'input-terminal-container', 'output-terminal-container', 'utils'],
function (ExtendedFactory, InputTerminalContainer, OutputTerminalContainer, utils) {

    TerminalFactory.prototype = Object.create(ExtendedFactory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'terminal');
        this.__containers = {
            'input-terminal': new InputTerminalContainer(),
            'output-terminal': new OutputTerminalContainer()
        };
    };
    // public methods
    TerminalFactory.prototype.create = function (terminalString) {
        var terminal = ExtendedFactory.prototype.create.call(this, terminalString);
        this.__containers[terminalString].add(terminal);
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function (terminalString) {
        return this.__containers[terminalString];
    };

    return TerminalFactory;
});