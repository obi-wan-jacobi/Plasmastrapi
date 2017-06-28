define(['circuit-element'],
function (CircuitElement) {

    // CLASS Terminal
    Terminal.prototype = Object.create(CircuitElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal() {
        CircuitElement.call(this);
    };
    
    return Terminal;
});