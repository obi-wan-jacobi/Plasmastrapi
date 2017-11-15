define(['factory', 'utils', 'circuits-config'],
    function (Factory, utils, config) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(engine) {
        Factory.call(this, engine, 'wire-element', 'wire-container');
        this.__circuitElementFactory = null;
    };
    // private methods
    WireFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
    };
    // public methods
    WireFactory.prototype.create = function (wireElementString, tailElement, headElement) {
        utils.validator.validateClassType(this, wireElementString, this.__typeString);
        var isThisConnectionBeingDuplicated = this.__container.forEach(function (wire) {
            if (wire.outputTerminal === tailElement && wire.inputTerminal === headElement) {
                return true;
            }
        }, this);
        if (isThisConnectionBeingDuplicated) {
            return;
        } 
        var wireElement = this.__circuitElementFactory.create(wireElementString);
        if (utils.validator.isInstanceOfType(wireElement, 'wire')) {
            this.__container.add(wireElement);
        }
        return wireElement;
    };

    return WireFactory;
});