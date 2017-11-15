define(['container'],
function (Container) {

    // CLASS EntityContainer
    EntityContainer.prototype = Object.create(Container.prototype);
    EntityContainer.prototype.constructor = EntityContainer;
    function EntityContainer(typeString) {
        Container.call(this, typeString || 'entity');
    };
    EntityContainer.prototype.add = function (entity) {
        Container.prototype.add.call(this, entity);
        entity.addEventListener('ondestroy', this, this.remove.bind(this, entity));
    };

    return EntityContainer;
});