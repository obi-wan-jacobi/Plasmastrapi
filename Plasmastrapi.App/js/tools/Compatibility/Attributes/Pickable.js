define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    Pickable.prototype = Object.create(CompatibilityAttribute.prototype);
    Pickable.prototype.constructor = Pickable;
    function Pickable() {
        CompatibilityAttribute.call(this);
    };

    return Pickable;
});