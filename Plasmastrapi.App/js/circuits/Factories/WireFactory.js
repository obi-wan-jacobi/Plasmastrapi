define(['extended-factory', 'wire-container', 'utils'],
    function (ExtendedFactory, WireContainer, utils) {

    WireFactory.prototype = Object.create(ExtendedFactory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'wire', 'wire-container');
    };
    // private methods
    WireFactory.prototype.__validateWireIsNotBeingDuplicated = function (tailElement, headElement) {
        var isThisConnectionBeingDuplicated = this.__container.find(function (wire) {
            return wire.outputTerminal === tailElement && wire.inputTerminal === headElement;
        }, this) ? true : false;
        return isThisConnectionBeingDuplicated;
    };
    // public methods
    WireFactory.prototype.create = function (args) {
        utils.validator.validateInstanceType(this, args, 'array');
        var tailElement = args[0];
        var headElement = args[1];
        this.__validateWireIsNotBeingDuplicated(tailElement, headElement);
        return ExtendedFactory.prototype.create.call(this, this.__typeString, args);
    };

    return WireFactory;
});