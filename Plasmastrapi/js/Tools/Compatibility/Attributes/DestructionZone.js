define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    DestructionZone.prototype = Object.create(CompatibilityAttribute.prototype);
    DestructionZone.prototype.constructor = DestructionZone;
    function DestructionZone() {
        CompatibilityAttribute.call(this);
    };

    return DestructionZone;
});