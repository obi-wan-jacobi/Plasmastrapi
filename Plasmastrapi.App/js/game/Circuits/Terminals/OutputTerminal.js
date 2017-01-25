define(["./Terminal"], function (Terminal) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {
        Terminal.call(this, offsetPosition, circuitElement);
        this.__defaultFrameIndex = 0;
    };
    
    return OutputTerminal;
});