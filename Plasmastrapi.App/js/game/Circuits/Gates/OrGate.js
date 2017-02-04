define(["../Base/Gate"], function (Gate) {

    // CLASS OrGate
    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate(x, y) {
        Gate.call(this, x, y);
    };

    return OrGate;
});