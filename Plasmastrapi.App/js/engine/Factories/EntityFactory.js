define(['factory', 'container', 'emitter-factory', 'entity', 'component-factory', 'pose', 'mesh', 'vertex', 'pick-handle',  'validator'],
    function (Factory, Container, EmitterFactory, Entity, ComponentFactory, Pose, Mesh, Vertex, PickHandle, validator) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, Entity);
        this.__emitterFactory = engine.getFactory(EmitterFactory);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__container = new Container(Entity);
    };
    // public methods
    EntityFactory.prototype.create = function (EntityType, args) {
        var entity = this.__emitterFactory.create(EntityType, args);
        validator.validateInstanceType(this, entity, Entity);
        this.__container.add(entity);
        entity.addEventListener('ondestroy', this, this.__container.remove.bind(this, entity));
        // add components
        entity.addComponent(this.__componentFactory.createFromPrimitive(new Pose()));
        entity.addComponent(this.__componentFactory.createFromPrimitive(new Mesh([new Vertex()])));
        entity.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { })));
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EntityFactory;
});