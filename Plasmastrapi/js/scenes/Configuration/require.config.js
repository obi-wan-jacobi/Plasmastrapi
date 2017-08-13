define(function () {
    var paths = {
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});