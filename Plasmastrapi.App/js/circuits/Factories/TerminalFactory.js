define(['extended-factory', 'input-terminal-container', 'output-terminal-container', 'utils'],
function (ExtendedFactory, InputTerminalContainer, OutputTerminalContainer, utils) {

    TerminalFactory.prototype = Object.create(ExtendedFactory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'terminal');
        this.__inputTerminalContainer = new InputTerminalContainer();
        this.__outputTerminalContainer = new OutputTerminalContainer();
    };
    // public methods
    TerminalFactory.prototype.create = function (terminalString) {
        var terminal = ExtendedFactory.prototype.create.call(this, terminalString);
        if (utils.validator.isInstanceOfType(terminal, 'input-terminal')) {
            this.__inputTerminalContainer.add(terminal);
        } else if (utils.validator.isInstanceOfType(terminal, 'output-terminal')) {
            this.__outputTerminalContainer.add(terminal);
        }
        return terminal;
    };
    TerminalFactory.prototype.getInputTerminalContainer = function () {
        return this.__inputTerminalContainer;
    };
    TerminalFactory.prototype.getOutputTerminalContainer = function () {
        return this.__outputTerminalContainer;
    };

    return TerminalFactory;
});