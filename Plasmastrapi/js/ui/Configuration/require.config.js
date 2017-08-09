require(['configurator', 'logging'], function (configurator, logging) {
    var paths = {
        'ui-element': './ui/Base/UIElement',
        'ui-element-factory': './ui/Factories/UIElementFactory',
        // Configuration
        'ui-debug': './ui/Configuration/debug',
        'ui-config': './ui/Configuration/config'
    };
    configurator.config(paths, function () {
        logging.console('UI modules have been loaded.');
    });
});