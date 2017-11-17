define(['mixin', 'utils'],
function (Mixin, utils) {

    Decorator.prototype = Object.create(Mixin.prototype);
    Decorator.prototype.constructor = Decorator;
    function Decorator(engine, decoratorString) {
        utils.validator.validateInstanceType(this, this, 'entity');
        utils.validator.validateInstanceType(this, engine, 'engine');
        utils.validator.validateClassType(this, decoratorString, 'decorator');
        this.__engine = engine;
        var DecoratorPrototype = utils.modules.require(decoratorString).prototype;
        for (var propertyName in DecoratorPrototype) {
            if (DecoratorPrototype.hasOwnProperty(propertyName) && !(propertyName === 'constructor')) {
                if (propertyName.slice(0, 2) === '__') {
                    Mixin.prototype.proxyMethod.call(this, DecoratorPrototype, propertyName);
                } else {
                    Mixin.prototype.addMethod.call(this, DecoratorPrototype, propertyName);
                }
            }
        }
    };

    return Decorator;
});