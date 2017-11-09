define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    Trashable.prototype = Object.create(CompatibilityAttribute.prototype);
    Trashable.prototype.constructor = Trashable;
    function Trashable() {
        CompatibilityAttribute.call(this);
    };

    return Trashable;
});