define(['factory', 'container', 'emitter-factory', 'entity', 'validator'],
function (Factory, Container, EmitterFactory, Entity, validator) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, Entity);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__container = new Container(Entity);
    };
    // public methods
    EntityFactory.prototype.create = function (EntityType, args) {
        var entity = this.__emitterFactory.create(EntityType, args);
        validator.validateInstanceType(this, entity, Entity);
        this.__container.add(entity);
        entity.addEventListener('ondestroy', this, this.__container.remove.bind(this, entity));
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EntityFactory;
});