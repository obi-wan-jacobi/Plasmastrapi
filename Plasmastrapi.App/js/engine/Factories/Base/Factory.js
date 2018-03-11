define(['base', 'utils'],
function (Base, utils) {

    Factory.prototype = Object.create(Base.prototype);
    Factory.prototype.constructor = Factory;
    function Factory(engine, typeString, /* optional */ containerString) {
        utils.validator.validateInstanceType(this, typeString, 'string');
        Base.call(this, engine);
        this.__typeString = typeString;
        this.__container = null;
        if (containerString) {
            utils.validator.validateClassType(this, containerString, 'container');
            var ContainerType = utils.modules.require(containerString);
            this.__container = new ContainerType(this.__typeString);
        }
    };
    // private methods
    Factory.prototype.__oninit = function () { };
    Factory.prototype.__onload = function () { };
    Factory.prototype.__onunload = function () { };
    // public methods
    Factory.prototype.create = function (typeString, args) {
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        utils.validator.validateClassType(this, typeString, this.__typeString);
        var ObjectType = utils.modules.require(typeString);
        var instance = new (Function.prototype.bind.apply(ObjectType, [null].concat(args)))();
        if (this.__container) {
            this.__container.add(instance);
        }
        return instance;
    };
    Factory.prototype.getContainer = function () {
        return this.__container;
    };

    return Factory;
});