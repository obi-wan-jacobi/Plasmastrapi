define(['factory', 'utils'],
function (Factory, utils) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, engine, 'entity', 'entity-container');
        this.__emitterFactory = null;
    };
    // private methods
    EntityFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__emitterFactory = this.__engine.getFactory('emitter-factory');
    };
    // public methods
    EntityFactory.prototype.create = function (entityString, args) {
        utils.validator.validateClassType(this, entityString, 'entity');
        var entity = this.__emitterFactory.create(entityString, args);
        this.__container.add(entity);
        return entity;
    };

    return EntityFactory;
});