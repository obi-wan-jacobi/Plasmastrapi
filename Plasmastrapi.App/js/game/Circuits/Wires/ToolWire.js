define(["../Base/WireElement"], function (WireElement) {

    // CLASS ToolWire
    // forms the wire between a terminal and a ToolHandle
    ToolWire.prototype = Object.create(WireElement.prototype);
    ToolWire.prototype.constructor = ToolWire;
    function ToolWire(outputTerminal, inputTerminal) {
        WireElement.call(this, outputTerminal, inputTerminal);
    };

    return ToolWire;
});