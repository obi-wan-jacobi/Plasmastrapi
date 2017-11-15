define(['factory', 'utils', 'circuits-config'],
function (Factory, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(engine) {
        Factory.call(this, engine, 'logic-element', 'logic-element-container');
        this.__circuitElementFactory = null;
    };
    // private methods
    LogicElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    LogicElementFactory.prototype.create = function (logicElementString) {
        utils.validator.validateClassType(this, logicElementString, this.__typeString);
        var logicElement = this.__circuitElementFactory.create(logicElementString);
        this.__container.add(logicElement);
        return logicElement;
    };

    return LogicElementFactory;
});