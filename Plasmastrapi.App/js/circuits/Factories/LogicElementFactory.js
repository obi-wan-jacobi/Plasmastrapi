define(['extended-factory', 'utils', 'circuits-config'],
function (ExtendedFactory, utils, config) {

    LogicElementFactory.prototype = Object.create(ExtendedFactory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(engine) {
        ExtendedFactory.call(this, engine, 'circuit-element-factory', 'logic-element', 'logic-element-container');
    };

    return LogicElementFactory;
});