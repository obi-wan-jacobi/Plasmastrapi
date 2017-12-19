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
        'selection-box-controller': './game/Controllers/SelectionBoxController',
        // Factories
        'augmented-logic-element-factory': './game/Factories/AugmentedLogicElementFactory',
        'augmented-terminal-factory': './game/Factories/AugmentedTerminalFactory',
        'augmented-wire-factory': './game/Factories/AugmentedWireFactory',
        'tool-action-factory': './game/Factories/ToolActionFactory',
        // Scenes
        'main-menu-scene': './game/Scenes/MainMenuScene',
        'lab-scene': './game/Scenes/LabScene',
        // Systems
        'game-cache-diagnostics-system': './game/Systems/Diagnostics/GameCacheDiagnosticsSystem',
        // Tool Actions
        'tool-action': './game/ToolActions/Base/ToolAction',
        'batch-tool-action': './game/ToolActions/BatchToolAction',
        'batch-destroy-logic-elements-action': './game/ToolActions/BatchDestroyLogicElementsAction',
        'destroy-logic-element-action': './game/ToolActions/DestroyLogicElementAction',
        'destroy-wire-action': './game/ToolActions/DestroyWireAction',
        'place-action': './game/ToolActions/PlaceAction',
        'spawn-action': './game/ToolActions/SpawnAction',
        'trash-action': './game/ToolActions/TrashAction',
        'wire-action': './game/ToolActions/WireAction',
        'wire-cutter-action': './game/ToolActions/WireCutterAction',
        // Tool Helpers
        'selection-box': './game/ToolHelpers/SelectionBox',
        'wire-cutter': './game/ToolHelpers/WireCutter',
        // Tools
        'tool-handler': './game/Tools/Base/ToolHandler',
        'no-tool': './game/Tools/NoTool',
        'placing-tool': './game/Tools/PlacingTool',
        'selection-tool': './game/Tools/SelectionTool',
        'spawning-tool': './game/Tools/SpawningTool',
        'trash-tool': './game/Tools/TrashTool',
        'wire-cutter-tool': './game/Tools/WireCutterTool',
        'wire-tool': './game/Tools/WireTool',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});