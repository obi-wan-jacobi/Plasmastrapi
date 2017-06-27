define(['circuit-element'],
function (CircuitElement) {

    // CLASS Terminal
    Terminal.prototype = Object.create(CircuitElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(LogicElement) {
        CircuitElement.call(this);
        this.addParent(LogicElement);
    };
    
    return Terminal;
});