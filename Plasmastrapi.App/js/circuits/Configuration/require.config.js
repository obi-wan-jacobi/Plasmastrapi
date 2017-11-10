define(function () {
    var paths = {
        // Configuration
        'circuits-config': './circuits/Configuration/config',
        'circuits-constants': './circuits/Configuration/constants',
        'circuits-debug': './circuits/Configuration/debug',
        // Base
        'circuit-element': './circuits/Base/CircuitElement',
        // Containers
        'logic-element-container': './circuits/Containers/LogicElementContainer',
        // Factories
        'circuit-element-factory': './circuits/Factories/CircuitElementFactory',
        'logic-element-factory': './circuits/Factories/LogicElementFactory',
        'terminal-factory': './circuits/Factories/TerminalFactory',
        'wire-factory': './circuits/Factories/WireFactory',
        // Logic Elements
        'logic-element': './circuits/LogicElements/Base/LogicElement',
            // --- Gates ---
            'gate': './circuits/LogicElements/Gates/Base/Gate',
            'and-gate': './circuits/LogicElements/Gates/AndGate',
            'nand-gate': './circuits/LogicElements/Gates/NandGate',
            'or-gate': './circuits/LogicElements/Gates/OrGate',
            'xor-gate': './circuits/LogicElements/Gates/XorGate',
            // --- Power ---
            'power-source': './circuits/LogicElements/Power/PowerSource',
        // Terminals
        'terminal': './circuits/Terminals/Base/Terminal',
        'input-terminal': './circuits/Terminals/InputTerminal',
        'output-terminal': './circuits/Terminals/OutputTerminal',
        // Wires
        'wire-element': './circuits/Wires/Base/WireElement',
        'terminal-wire': './circuits/Wires/TerminalWire',
        'wire-anchor': './circuits/Wires/WireAnchor',
        'wire': './circuits/Wires/Wire'
    };
    require.config({ paths: paths });
    return paths;
});