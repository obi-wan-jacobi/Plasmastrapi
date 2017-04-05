define(["../Base/Compatible"], function (Compatible) {

    function WireableAsInput() {
        Compatible.call(this, WireableAsInput);
    };
    WireableAsInput.resolve = Compatible.prototype.resolve;

    return WireableAsInput;
});