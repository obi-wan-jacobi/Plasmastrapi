define([
    // Base
    'container',
    // Circuits
    'circuit-element'
],
function (Container, CircuitElement) {

    // CLASS EntityContainer
    EntityContainer.prototype = Object.create(Container.prototype);
    EntityContainer.prototype.constructor = EntityContainer;
    function EntityContainer() {
        Container.call(this, CircuitElement);
    };

    return EntityContainer;
});