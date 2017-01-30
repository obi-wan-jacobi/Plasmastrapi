define([
    "./Terminals/Terminal",
    "./Gates/AndGate",
    "./Gates/NandGate",
    "./Gates/OrGate",
    "./Gates/XorGate",
    "./Power/PowerSource",
    "./Wires/Wire",
    "./Terminals/TerminalHandle",
    "./Wires/ToolWire"
],
function (Terminal, AndGate, NandGate, OrGate, XorGate, PowerSource, Wire, TerminalHandle, ToolWire) {

    return {
        Terminal,
        AndGate,
        NandGate,
        OrGate,
        XorGate,
        PowerSource,
        Wire,
        TerminalHandle,
        ToolWire
    };
});