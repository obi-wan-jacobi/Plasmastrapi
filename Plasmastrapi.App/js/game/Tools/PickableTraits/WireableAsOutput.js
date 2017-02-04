define(["../Base/PickableTrait"], function (PickableTrait) {

    function WireableAsOutput() {
        PickableTrait.call(this, WireableAsOutput);
    };
    WireableAsOutput.resolve = PickableTrait.prototype.resolve;

    return WireableAsOutput;
});