define(['factory', 'container', 'emitter-factory', 'entity', 'validator'],
function (Factory, Container, EmitterFactory, Entity, validator) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, Entity);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__container = new Container(Entity);
    };
    // private methods
    EntityFactory.prototype.__onEntityDestroy = function (entity) {
        this.__container.remove(entity);
    };
    // public methods
    EntityFactory.prototype.create = function (EntityType) {
        var entity = this.__emitterFactory.create(EntityType);
        validator.validateType(this, entity, Entity);
        this.__container.add(entity);
        entity.addEventListener('ondestroy', this, this.__onEntityDestroy.bind(this, entity));
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EntityFactory;
});