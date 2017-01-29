define(["../Objects/Container", "../Objects/Entity"], function (Container, Entity) {

    // CLASS EntityContainer
    EntityContainer.prototype = Object.create(Container.prototype);
    EntityContainer.prototype.constructor = EntityContainer;
    function EntityContainer() {
        Container.call(this, Entity);
    };

    return EntityContainer;
});