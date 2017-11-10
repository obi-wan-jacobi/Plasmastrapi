define(function () {
    var paths = {
        // Configuration
        'game-config': './game/Configuration/config',
        'game-debug': './game/Configuration/debug',
        // Assets
        'assets': './game/Assets/assets',
        // Game
        'game': './game/Game'
    };
    require.config({ paths: paths });
    return paths;
});