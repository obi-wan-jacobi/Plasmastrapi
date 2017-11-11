define(['factory', 'entity-container', 'pose', 'polygon', 'vertex', 'pick-handle', 'utils'],
function (Factory, EntityContainer, Pose, Polygon, Vertex, PickHandle, utils) {

    EntityFactory.prototype = Object.create(Factory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        Factory.call(this, engine);
        this.__emitterFactory = null;
        this.__componentFactory = null;
        this.__container = new EntityContainer();
    };
    // private methods
    EntityFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__emitterFactory = this.__engine.getFactory('emitter-factory');
        this.__componentFactory = this.__engine.getFactory('component-factory');
    };
    // public methods
    EntityFactory.prototype.create = function (entityString, args) {
        var entity = this.__emitterFactory.create(entityString, args);
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