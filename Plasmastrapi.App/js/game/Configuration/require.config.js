define(function () {
    var paths = {
        // Configuration
        'game-config': './game/Configuration/config',
        'game-debug': './game/Configuration/debug',
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'lab-controller': './game/Controllers/LabController',
        'revision-controller': './game/Controllers/RevisionController',
        // Factories
        'augmented-logic-element-factory': './game/Factories/AugmentedLogicElementFactory',
        'augmented-terminal-factory': './game/Factories/AugmentedTerminalFactory',
        'augmented-wire-factory': './game/Factories/AugmentedWireFactory',
        'tool-action-factory': './game/Factories/ToolActionFactory',
        // Input Handlers
        'tool-handler': './game/InputHandlers/Base/ToolHandler',
        'idle-handler': './game/InputHandlers/Base/IdleHandler',
        'placing-tool': './game/InputHandlers/PlacingTool',
        'selection-tool': './game/InputHandlers/SelectionTool',
        'spawning-tool': './game/InputHandlers/SpawningTool',
        'trash-tool': './game/InputHandlers/TrashTool',
        'wire-cutter-tool': './game/InputHandlers/WireCutterTool',
        'wire-tool': './game/InputHandlers/WireTool',
        // Scenes
        'main-menu-scene': './game/Scenes/MainMenuScene',
        'lab-scene': './game/Scenes/LabScene',
        // Systems
        'game-cache-diagnostics-system': './game/Systems/Diagnostics/GameCacheDiagnosticsSystem',
        // Tool Actions
        'tool-action': './game/ToolActions/Base/ToolAction',
        'wire-action': './game/ToolActions/WireAction',
        'wire-cutter-action': './game/ToolActions/WireCutterAction',
        // Tool Helpers
        'selection-box': './game/ToolHelpers/SelectionBox',
        'wire-cutter': './game/ToolHelpers/WireCutter',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});