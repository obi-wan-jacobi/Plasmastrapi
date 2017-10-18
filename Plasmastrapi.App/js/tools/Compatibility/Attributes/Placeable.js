define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    Placeable.prototype = Object.create(CompatibilityAttribute.prototype);
    Placeable.prototype.constructor = Placeable;
    function Placeable() {
        CompatibilityAttribute.call(this);
    };

    return Placeable;
});