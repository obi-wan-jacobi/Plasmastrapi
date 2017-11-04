define(['circuit-element'],
function (CircuitElement) {

    // CLASS WireElement
    WireElement.prototype = Object.create(CircuitElement.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement() {
        CircuitElement.call(this);
    };

    return WireElement;
});