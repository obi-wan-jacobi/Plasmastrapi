define(['factory', 'entity-container', 'emitter-factory', 'entity', 'component-factory', 'pose', 'polygon', 'vertex', 'pick-handle',  'validator'],
    function (Factory, EntityContainer, EmitterFactory, Entity, ComponentFactory, Pose, Polygon, Vertex, PickHandle, validator) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, Entity);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__container = new EntityContainer();
    };
    // public methods
    EntityFactory.prototype.create = function (EntityType, args) {
        var entity = this.__emitterFactory.create(EntityType, args);
        // add components
        entity.addComponent(this.__componentFactory.createFromPrimitive(new Pose()));
        entity.addComponent(this.__componentFactory.createFromPrimitive(new Polygon([new Vertex()])));
        entity.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { })));
        this.__container.add(entity);
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EntityFactory;
});