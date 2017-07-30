require(['configurator', 'logging'], function (configurator, logging) {
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
        'wire': './circuits/Wires/Wire',
        // Containers
        'logic-element-container': './circuits/Containers/LogicElementContainer',
        'wire-container': './game/circuits/WireContainer',
        // Factories
        'circuit-element-factory': './circuits/Factories/CircuitElementFactory',
        'logic-element-factory': './circuits/Factories/LogicElementFactory',
        'terminal-factory': './circuits/Factories/TerminalFactory',
        // Configuration
        'circuits-debug': './circuits/Configuration/debug',
        'circuits-config': './circuits/Configuration/config',
        'circuits-constants': './circuits/Configuration/constants'
    };
    configurator.config(paths, function () {
        logging.console('Circuit modules have been loaded.');
    });
});