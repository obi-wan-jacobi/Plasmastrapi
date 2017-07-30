require(['configurator', 'logging'], function (configurator, logging) {
    var paths = {
        
        // Configuration
        'ui-debug': './ui/Configuration/debug',
        'ui-config': './ui/Configuration/config'
    };
    configurator.config(paths, function () {
        logging.console('UI modules have been loaded.');
    });
});