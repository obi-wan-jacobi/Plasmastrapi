define(["../../engine/Objects/Container", "../Lab/Wires/Wire"], function(Container, Wire) {

    // CLASS WireContainer
    WireContainer.prototype = Object.create(Container.prototype);
    WireContainer.prototype.constructor = WireContainer;
    function WireContainer() {
        Container.call(this, Wire);
    };

    return WireContainer;
});