define(function () {
    var paths = {
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'controller': './game/Controllers/Base/Controller',
        'input-controller': './game/Controllers/InputController',
        'lab-controller': './game/Controllers/LabController',
        'pick-controller': './game/Controllers/PickController',
        'scene-controller': './game/Controllers/SceneController',
        // Input Handlers
        'input-handler': './game/InputHandlers/Base/InputHandler',
        'empty-handler': './game/InputHandlers/EmptyHandler',
        // Configuration
        'game-debug': './game/Configuration/debug',
        'game-config': './game/Configuration/config',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});