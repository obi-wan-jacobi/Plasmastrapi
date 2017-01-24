define([
    "./Terminals/Terminal",
    "./Gate/AndGate",
    "./Gate/NandGate",
    "./Gate/OrGate",
    "./Gate/XorGate",
    "./Gate/AndGate",
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