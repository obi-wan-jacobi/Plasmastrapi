define(function () {

    // CLASS NandGate
    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate(x, y) {
        Gate.call(this, x, y);
    };

    return NandGate;
});