define(["./Gate"], function (Gate) {

    // CLASS XorGate
    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate(x, y) {
        Gate.call(this, x, y);
    };

    return XorGate;
});