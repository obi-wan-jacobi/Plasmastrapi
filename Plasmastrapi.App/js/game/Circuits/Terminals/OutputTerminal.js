define(["./Terminal", "../../../engine/Components/$Components", "../../Tools/Compatibility/$Compatibility"], function (Terminal, $, $Compatibility) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {
        Terminal.call(this, offsetPosition, circuitElement);
        this.__defaultFrameIndex = 0;
        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);
        $Compatibility.WireableAsOutput.call(pickableComponent);
    };
    
    return OutputTerminal;
});