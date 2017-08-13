define(function () {
    var paths = {
        // Assets
        'asset-urls': './game/Assets/assetUrls',
        // Controllers
        'controller': './game/Controllers/Base/Controller',
        'scene-controller': './game/Controllers/SceneController',
        // Tools
        // Configuration
        'game-debug': './game/Configuration/debug',
        'game-config': './game/Configuration/config',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});