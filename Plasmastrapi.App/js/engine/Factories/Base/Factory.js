define(['base', 'utils'],
function (Base, utils) {

    Factory.prototype = Object.create(Base.prototype);
    Factory.prototype.constructor = Factory;
    function Factory(engine, /* optional */ typeString, /* optional */ containerString) {
        Base.call(this, engine);
        this.__typeString = null;
        this.__container = null;
        if (typeString) {
            utils.validator.validateInstanceType(this, typeString, 'string');
            this.__typeString = typeString;
        }
        if (containerString) {
            utils.validator.validateClassType(this, containerString, 'container');
            this.__container = new (utils.modules.require(containerString))();
        }
    };
    // private methods
    Factory.prototype.__oninit = function () { };
    Factory.prototype.__onload = function () { };
    Factory.prototype.__onunload = function () { };
    // public methods
    Factory.prototype.create = function (typeString, args) {
        if (!this.__typeString) {
            utils.validator.throw(this, 'create', `${this.name} must be constructed with a typeString in order to create()`);
        }
        args = args || [];
        utils.validator.validateInstanceType(this, args, 'array');
        utils.validator.validateClassType(this, typeString, this.__typeString);
        var ObjectType = utils.modules.require(typeString);
        var instance = new (Function.prototype.bind.apply(ObjectType, [null].concat(args)))()
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