define(['entity'],
function (Entity) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(Entity.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement() {
        Entity.call(this);
        this.registerEvents(
            'onplace',
            'onstatechange'
        );
    };

    return CircuitElement;
});
