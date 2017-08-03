require(['configurator', 'logging'], function (configurator, logging) {
    var paths = {
        // Assets
        'asset-urls': './game/Assets/assetUrls',
        // Controllers
        'controller': './game/Controllers/Base/Controller',
        'scene-controller': './game/Controllers/SceneController',
        // Loaders
        'asset-loader': './game/Loaders/AssetLoader',
        // Scenes
        'scene': './game/Scenes/Base/Scene',
        'circuit-design-scene': './game/Scenes/CircuitDesignScene',
        'main-menu-scene': './game/Scenes/MainMenuScene',
        // Tools
        // Configuration
        'game-debug': './game/Configuration/debug',
        'game-config': './game/Configuration/config',
        // Game
        'game': './game/Game'
    };
    configurator.config(paths, function () {
        logging.console('Game modules have been loaded.');
    });
});