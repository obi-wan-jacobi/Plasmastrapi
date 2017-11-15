define(function () {
    var paths = {
        // Configuration
        'game-config': './game/Configuration/config',
        'game-debug': './game/Configuration/debug',
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'lab-controller': './game/Controllers/LabController',
        // Elements
        'selection-box': './game/Elements/SelectionBox',
        // Factories
        'augmented-logic-element-factory': './game/Factories/AugmentedLogicElementFactory',
        'augmented-terminal-factory': './game/Factories/AugmentedTerminalFactory',
        'augmented-wire-factory': './game/Factories/AugmentedWireFactory',
        // Input Handlers
        'idle-tool': './game/InputHandlers/IdleTool',
        'placing-tool': './game/InputHandlers/PlacingTool',
        'spawning-tool': './game/InputHandlers/SpawningTool',
        'trash-tool': './game/InputHandlers/TrashTool',
        'wire-tool': './game/InputHandlers/WireTool',
        'wire-cutter-tool': './game/InputHandlers/WireCutterTool',
        // Scenes
        'main-menu-scene': './game/Scenes/MainMenuScene',
        'lab-scene': './game/Scenes/LabScene',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});