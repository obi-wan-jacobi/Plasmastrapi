define(['mixin', 'utils'],
function (Mixin, utils) {

    Decorator.prototype = Object.create(Mixin.prototype);
    Decorator.prototype.constructor = Decorator;
    function Decorator(engine, decoratorString) {
        utils.validator.validateInstanceType(this, this, 'entity');
        utils.validator.validateInstanceType(this, engine, 'engine');
        utils.validator.validateClassType(this, decoratorString, 'decorator');
        this.__engine = engine;
        this.__MixinPrototype = utils.modules.require(decoratorString).prototype;
        for (var propertyName in this.__MixinPrototype) {
            if (this.__MixinPrototype.hasOwnProperty(propertyName) && !(propertyName === 'constructor')) {
                if (propertyName.slice(0, 2) === '__') {
                    Mixin.prototype.proxyMethod.call(this, propertyName);
                } else {
                    Mixin.prototype.addMethod.call(this, propertyName);
                }
            }
        }
    };

    return Decorator;
});