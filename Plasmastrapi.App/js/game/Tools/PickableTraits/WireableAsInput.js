define(["../Base/PickableTrait"], function (PickableTrait) {

    function WireableAsInput() {
        PickableTrait.call(this, WireableAsInput);
    };
    WireableAsInput.resolve = PickableTrait.prototype.resolve;

    return WireableAsInput;
});