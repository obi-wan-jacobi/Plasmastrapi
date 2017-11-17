define(function () {
    var paths = {
        // Configuration
        'game-config': './game/Configuration/config',
        'game-debug': './game/Configuration/debug',
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'lab-controller': './game/Controllers/LabController',
        // Factories
        'augmented-logic-element-factory': './game/Factories/AugmentedLogicElementFactory',
        'augmented-terminal-factory': './game/Factories/AugmentedTerminalFactory',
        'augmented-wire-factory': './game/Factories/AugmentedWireFactory',
        // Input Handlers
        'idle-handler': './game/InputHandlers/IdleHandler',
        'placing-tool': './game/InputHandlers/PlacingTool',
        'select-handler': './game/InputHandlers/SelectHandler',
        'spawning-tool': './game/InputHandlers/SpawningTool',
        'trash-tool': './game/InputHandlers/TrashTool',
        'wire-cutter-tool': './game/InputHandlers/WireCutterTool',
        'wire-tool': './game/InputHandlers/WireTool',
        // Scenes
        'main-menu-scene': './game/Scenes/MainMenuScene',
        'lab-scene': './game/Scenes/LabScene',
        // Tool Helpers
        'selection-box': './game/ToolHelpers/SelectionBox',
        'wire-cutter': './game/ToolHelpers/WireCutter',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});