define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    WireableAsOutput.prototype = Object.create(CompatibilityAttribute.prototype);
    WireableAsOutput.prototype.constructor = WireableAsOutput;
    function WireableAsOutput() {
        CompatibilityAttribute.call(this);
    };

    return WireableAsOutput;
});