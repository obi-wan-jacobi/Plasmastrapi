define(function () {
    var paths = {
        // Circuit Element
        'circuit-element': './circuits/Base/CircuitElement',
        // Logic Element
        'logic-element': './circuits/LogicElements/Base/LogicElement',
        // Gates
        'gate': './circuits/LogicElements/Gates/Base/Gate',
        'and-gate': './circuits/LogicElements/Gates/AndGate',
        'nand-gate': './circuits/LogicElements/Gates/NandGate',
        'or-gate': './circuits/LogicElements/Gates/OrGate',
        'xor-gate': './circuits/LogicElements/Gates/XorGate',
        // Power
        'power-source': './circuits/LogicElements/Power/PowerSource',
        // Terminals
        'terminal': './circuits/Terminals/Base/Terminal',
        'input-terminal': './circuits/Terminals/InputTerminal',
        'output-terminal': './circuits/Terminals/OutputTerminal',
        // Wires
        'wire-element': './circuits/Wires/Base/WireElement',
        'terminal-wire': './circuits/Wires/TerminalWire',
        'wire-anchor': './circuits/Wires/WireAnchor',
        'wire': './circuits/Wires/Wire',
        // Containers
        // Factories
        'circuit-element-factory': './circuits/Factories/CircuitElementFactory',
        'logic-element-factory': './circuits/Factories/LogicElementFactory',
        'terminal-factory': './circuits/Factories/TerminalFactory',
        // Configuration
        'circuits-debug': './circuits/Configuration/debug',
        'circuits-config': './circuits/Configuration/config',
        'circuits-constants': './circuits/Configuration/constants'
    };
    require.config({ paths: paths });
    return paths;
});