define(["../../engine/Objects/Entity"], function (Entity) {

    // CLASS LabElement
    LabElement.prototype = Object.create(Entity.prototype);
    LabElement.prototype.constructor = LabElement;
    function LabElement() {
        Entity.call(this);
    };

    return LabElement;
});