define(['entity'],
function (Entity) {

    CircuitElement.prototype = Object.create(Entity.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement() {
        Entity.call(this);
        this.registerEvents(
            'onstatechange'
        );
    };

    return CircuitElement;
});
