define(['factory', 'utils'],
function (Factory, utils) {

    EntendedFactory.prototype = Object.create(Factory.prototype);
    EntendedFactory.prototype.constructor = EntendedFactory;
    function EntendedFactory(engine, baseFactoryString, typeString, /* optional */ containerString) {
        utils.validator.validateClassType(this, baseFactoryString, 'factory');
        utils.validator.validateInstanceType(this, baseFactoryString, 'string');
        utils.validator.validateInstanceType(this, typeString, 'string');
        Factory.call(this, engine, typeString, containerString);
        this.__baseFactoryString = baseFactoryString;
        this.__baseFactory = null;
    };
    // private methods
    EntendedFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__baseFactory = this.__engine.getFactory(this.__baseFactoryString);
    };
    // public methods
    EntendedFactory.prototype.create = function (typeString, args) {
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        utils.validator.validateClassType(this, typeString, this.__typeString);
        var instance = this.__baseFactory.create(typeString, args);
        if (this.__container && this.__containerString) {
            this.__container.add(instance);
        }
        return instance;
    };

    return EntendedFactory;
});