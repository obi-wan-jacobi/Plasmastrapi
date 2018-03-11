define(['extended-factory', 'wire-container', 'utils'],
function (ExtendedFactory, WireContainer, utils) {

    TerminalWireFactory.prototype = Object.create(ExtendedFactory.prototype);
    TerminalWireFactory.prototype.constructor = TerminalWireFactory;
    function TerminalWireFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'terminal-wire');
    };
    // public methods
    TerminalWireFactory.prototype.create = function (args) {
        return ExtendedFactory.prototype.create.call(this, this.__typeString, args);
    };

    return TerminalWireFactory;
});