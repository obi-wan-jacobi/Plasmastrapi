define([
    "./Terminals/Terminal",
    "./Gates/AndGate",
    "./Gates/NandGate",
    "./Gates/OrGate",
    "./Gates/XorGate",
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