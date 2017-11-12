define(['factory', 'entity-container', 'utils'],
function (Factory, EntityContainer, utils) {

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
        this.__container.add(entity);
        return entity;
    };
    EntityFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EntityFactory;
});