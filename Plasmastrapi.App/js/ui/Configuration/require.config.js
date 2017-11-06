define(function () {
    var paths = {
        'ui-element': './ui/Base/UIElement',
        'ui-element-factory': './ui/Factories/UIElementFactory',
        // Elements
        'button': './ui/Elements/Button',
        'panel': './ui/Elements/Panel',
        // Configuration
        'ui-debug': './ui/Configuration/debug',
        'ui-config': './ui/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});