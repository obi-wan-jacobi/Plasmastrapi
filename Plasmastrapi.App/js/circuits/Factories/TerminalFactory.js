define(['factory', 'input-terminal-container', 'output-terminal-container', 'utils', 'circuits-config'],
function (Factory, InputTerminalContainer, OutputTerminalContainer, utils, config) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        Factory.call(this, engine);
        this.__circuitElementFactory = null;
        this.__inputTerminalContainer = new InputTerminalContainer();
        this.__outputTerminalContainer = new OutputTerminalContainer();
    };
    // private methods
    TerminalFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
    };
    // public methods
    TerminalFactory.prototype.create = function (terminalString) {
        utils.validator.validateClassType(this, terminalString, 'terminal');
        var terminal = this.__circuitElementFactory.create(terminalString);
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