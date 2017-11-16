define(['extended-factory', 'utils'],
function (ExtendedFactory, utils) {

    EntityFactory.prototype = Object.create(ExtendedFactory.prototype);
    EntityFactory.prototype.constructor = EntityFactory;
    function EntityFactory(engine) {
        ExtendedFactory.call(this, engine, 'emitter-factory', 'entity', 'entity-container');
    };

    return EntityFactory;
});