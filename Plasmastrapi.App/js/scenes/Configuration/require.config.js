define(function () {
    var paths = {
        'scene': './scenes/Base/Scene',
        // Scenes
        'main-menu-scene': './scenes/MainMenuScene',
        'lab-scene': './scenes/LabScene',
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});