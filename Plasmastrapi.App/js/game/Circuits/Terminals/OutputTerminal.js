define(["../Base/Terminal", "../../../engine/Namespaces/$Components", "../../Tools/PickableTraits/$PickableTraits"], function (Terminal, $, $PickableTraits) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {
        Terminal.call(this, offsetPosition, circuitElement);
        this.__defaultFrameIndex = 0;
        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.WireableAsOutput.call(pickableComponent);
    };
    
    return OutputTerminal;
});