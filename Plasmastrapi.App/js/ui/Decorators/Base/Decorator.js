define(['utils'],
function (utils) {

    function Decorator(engine, DecoratorPrototype) {
        utils.validator.validateInstanceType(this, this, 'entity');
        utils.validator.validateInstanceType(this, engine, 'engine');
        this.__engine = engine;
        this.__DecoratorPrototype = DecoratorPrototype;
    };
    Decorator.prototype.addMethod = function (methodName) {
        if (!this.__DecoratorPrototype[methodName]) {
            utils.validator.throw(this, 'addMethod', `${this.__DecoratorPrototype.constructor.name} does not possess a ${methodName} method`);
        }
        if (this[methodName]) {
            utils.validator.throw(this, 'addMethod', `A ${methodName} already exists on ${this.constructor.name}`);
        }
        this[methodName] = this.__DecoratorPrototype[methodName];
    };

    return Decorator;
});