define([
    // Base
    'container',
    // Circuits
    'logic-element'
],
function (Container, LogicElement) {

    // CLASS EntityContainer
    EntityContainer.prototype = Object.create(Container.prototype);
    EntityContainer.prototype.constructor = EntityContainer;
    function EntityContainer() {
        Container.call(this, LogicElement);
    };

    return EntityContainer;
});