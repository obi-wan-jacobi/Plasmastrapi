define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    Draggable.prototype = Object.create(CompatibilityAttribute.prototype);
    Draggable.prototype.constructor = Draggable;
    function Draggable() {
        CompatibilityAttribute.call(this);
    };

    return Draggable;
});