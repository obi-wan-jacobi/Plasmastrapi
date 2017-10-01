define(function () {
    var paths = {
        // Assets
        'assets': './game/Assets/assets',
        // Controllers
        'controller': './game/Controllers/Base/Controller',
        'input-handler-controller': './game/Controllers/InputHandlerController',
        'scene-controller': './game/Controllers/SceneController',
        // Configuration
        'game-debug': './game/Configuration/debug',
        'game-config': './game/Configuration/config',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});