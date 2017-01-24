define(["./Gate", "../../../engine/Data/Graphics"], function (Gate, Graphics) {

    // CLASS AndGate
    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate(x, y) {
        Gate.call(this, x, y);
    };
    
    return AndGate;
});
