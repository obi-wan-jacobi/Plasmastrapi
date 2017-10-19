define(function () {
    var paths = {
        'scene': './scenes/Base/Scene',
        // Main Menu
        'main-menu': './scenes/MainMenu/MainMenu',
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});