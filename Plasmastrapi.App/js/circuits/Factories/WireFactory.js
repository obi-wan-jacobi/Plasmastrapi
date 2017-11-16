define(['extended-factory', 'wire-container', 'utils'],
    function (ExtendedFactory, WireContainer, utils) {

    WireFactory.prototype = Object.create(ExtendedFactory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'wire-element');
        this.__container = new WireContainer();
    };
    // public methods
    WireFactory.prototype.create = function (wireElementString, args) {
        utils.validator.validateClassType(this, wireElementString, this.__typeString);
        utils.validator.validateInstanceType(this, args, 'array');
        var tailElement = args[0];
        var headElement = args[1];
        var isThisConnectionBeingDuplicated = this.__container.forEach(function (wire) {
            if (wire.outputTerminal === tailElement && wire.inputTerminal === headElement) {
                return true;
            }
        }, this);
        if (isThisConnectionBeingDuplicated) {
            return;
        } 
        var wireElement = ExtendedFactory.prototype.create.call(this, wireElementString, args);
        if (utils.validator.isInstanceOfType(wireElement, 'wire')) {
            this.__container.add(wireElement);
        }
        return wireElement;
    };

    return WireFactory;
});