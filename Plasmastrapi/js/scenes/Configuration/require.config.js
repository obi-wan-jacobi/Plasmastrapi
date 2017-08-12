require(['configurator', 'logging'], function (configurator, logging) {
    var paths = {
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    configurator.config(paths, function () {
        logging.console('Scenes have been loaded.');
    });
});