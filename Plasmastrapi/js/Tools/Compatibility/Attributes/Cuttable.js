define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    Cuttable.prototype = Object.create(CompatibilityAttribute.prototype);
    Cuttable.prototype.constructor = Cuttable;
    function Cuttable() {
        CompatibilityAttribute.call(this);
    };

    return Cuttable;
});