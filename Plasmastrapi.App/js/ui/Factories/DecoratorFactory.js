define(['factory', 'utils'],
function (Factory, utils) {

    DecoratorFactory.prototype = Object.create(Factory.prototype);
    DecoratorFactory.prototype.constructor = DecoratorFactory;
    function DecoratorFactory(engine) {
        Factory.call(this, engine, 'decorator');
    };
    DecoratorFactory.prototype.create = function (decoratorString, entity) {
        utils.validator.validateClassType(this, decoratorString, 'decorator');
        utils.validator.validateInstanceType(this, entity, 'entity');
        var DecoratorType = utils.modules.require(decoratorString);
        DecoratorType.call(entity, this.__engine);
        return entity;
    };

    return DecoratorFactory;
});