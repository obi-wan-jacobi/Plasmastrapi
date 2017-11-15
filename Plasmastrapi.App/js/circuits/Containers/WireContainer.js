define(['entity-container'],
function (EntityContainer) {

    // CLASS WireContainer
    WireContainer.prototype = Object.create(EntityContainer.prototype);
    WireContainer.prototype.constructor = WireContainer;
    function WireContainer() {
        EntityContainer.call(this, 'wire');
    };

    return WireContainer;
});