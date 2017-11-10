define(function () {
    var paths = {
        // Configuration
        'scenes-config': './scenes/Configuration/config',
        'scenes-debug': './scenes/Configuration/debug',
        // Scenes
        'main-menu-scene': './scenes/MainMenuScene',
        'lab-scene': './scenes/LabScene',
    };
    require.config({ paths: paths });
    return paths;
});