define(function () {
    var paths = {
        'scene': './scenes/Base/Scene',
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});