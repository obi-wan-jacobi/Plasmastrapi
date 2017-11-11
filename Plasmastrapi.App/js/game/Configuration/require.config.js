define(function () {
    var paths = {
        // Configuration
        'game-config': './game/Configuration/config',
        'game-debug': './game/Configuration/debug',
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'lab-controller': './game/Controllers/LabController',
        // Input Handlers
        'lab-hotkey-handler': './game/InputHandlers/LabHotkeyHandler',
        'placing-tool': './game/InputHandlers/PlacingTool',
        // Scenes
        'main-menu-scene': './game/Scenes/MainMenuScene',
        'lab-scene': './game/Scenes/LabScene',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});