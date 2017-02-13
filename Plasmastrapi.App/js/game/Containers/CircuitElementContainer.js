define(["../../engine/Objects/Container", "../Circuits/Base/CircuitElement"], function (Container, CircuitElement) {

    // CLASS EntityContainer
    EntityContainer.prototype = Object.create(Container.prototype);
    EntityContainer.prototype.constructor = EntityContainer;
    function EntityContainer() {
        Container.call(this, CircuitElement);
    };

    return EntityContainer;
});