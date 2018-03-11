define(['factory', 'utils'],
function (Factory, utils) {

    EntendedFactory.prototype = Object.create(Factory.prototype);
    EntendedFactory.prototype.constructor = EntendedFactory;
    function EntendedFactory(engine, baseFactoryString, typeString, /* optional */ containerString) {
        utils.validator.validateClassType(this, baseFactoryString, 'factory');
        utils.validator.validateInstanceType(this, baseFactoryString, 'string');
        Factory.call(this, engine, typeString, containerString);
        this.__baseFactory = this.__engine.getFactory(baseFactoryString);
    };
    // public methods
    EntendedFactory.prototype.create = function (typeString, args) {
        utils.validator.validateClassType(this, typeString, this.__typeString);
        var instance = this.__baseFactory.create(typeString, args);
        if (this.__container) {
            this.__container.add(instance);
        }
        return instance;
    };

    return EntendedFactory;
});