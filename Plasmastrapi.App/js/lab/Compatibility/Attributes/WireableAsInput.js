define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    WireableAsInput.prototype = Object.create(CompatibilityAttribute.prototype);
    WireableAsInput.prototype.constructor = WireableAsInput;
    function WireableAsInput() {
        CompatibilityAttribute.call(this);
    };

    return WireableAsInput;
});