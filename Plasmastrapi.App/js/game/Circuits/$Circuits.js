define([
    "./Terminals/Terminal",
    "./Gates/AndGate",
    "./Gates/NandGate",
    "./Gates/OrGate",
    "./Gates/XorGate",
    "./Gates/AndGate",
    "./Power/PowerSource"
],
function (Terminal, AndGate, NandGate, OrGate, XorGate, PowerSource) {

    return {
        Terminal,
        AndGate,
        NandGate,
        OrGate,
        XorGate,
        PowerSource
    };
});