define(['base-element'],
function (BaseElement) {

    // CLASS Terminal
    Terminal.prototype = Object.create(BaseElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(circuitElement) {
        BaseElement.call(this);
        this.addParent(circuitElement)
    };
    
    return Terminal;
});