define(function () {
    var paths = {
        // Configuration
        'ui-config': './ui/Configuration/config',
        'ui-debug': './ui/Configuration/debug',
        // Controllers
        'cursor-controller': './ui/Controllers/CursorController',
        // Decorators
        'decorator': './ui/Decorators/Base/Decorator',
        'easy-composition-decorator': './ui/Decorators/EasyCompositionDecorator',
        // Elements
        'ui-element': './ui/Elements/Base/UIElement',
        'button': './ui/Elements/Button',
        'panel': './ui/Elements/Panel',
        // Factories
        'decorator-factory': './ui/Factories/DecoratorFactory',
        'ui-element-factory': './ui/Factories/UIElementFactory'
    };
    require.config({ paths: paths });
    return paths;
});