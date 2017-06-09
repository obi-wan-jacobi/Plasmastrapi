define(['base-element'],
function (BaseElement) {

    // CLASS Terminal
    Terminal.prototype = Object.create(BaseElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(parentElement, terminalWire) {
        BaseElement.call(this);
        this.addParent(parentElement)
        // TODO
        // add terminal wire
    };
    
    return Terminal;
});