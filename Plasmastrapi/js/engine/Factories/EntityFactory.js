define(['factory', 'emitter-factory', 'entity', 'validator'],
function (Factory, EmitterFactory, Entity, validator) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, engine);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__container = new Container(Entity);
    };
    // public methods
    EntityFactory.prototype.create = function (EntityType, pose) {
        var entity = this.__emitterFactory.create(EntityType);
        validator.validateType(entity, Entity);
        this.__container.add(entity);
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.___container;
    };

    return EntityFactory;
});