define(["./Compatible"], function (Compatible) {

    function WireableAsOutput() {
        Compatible.call(this, WireableAsOutput);
    };
    WireableAsOutput.resolve = Compatible.prototype.resolve;

    return WireableAsOutput;
});