require(['configurator', 'logging'], function (configurator, logging) {
    var paths = {
        'base': './engine/Base/Base',
        // Containers
        'container': './engine/Containers/Base/Container',
        'component-container': './engine/Containers/ComponentContainer',
        'drawable-component-container': './engine/Containers/DrawableComponentContainer',
        'emitter-container': './engine/Containers/EmitterContainer',
        // Controllers
        // Factories
        'factory': './engine/Factories/Base/Factory',
        'emitter-factory': './engine/Factories/EmitterFactory',
        'component-factory': './engine/Factories/ComponentFactory',
        'entity-factory': './engine/Factories/EntityFactory',
        // Scenes
        // Systems
        'system': './engine/Systems/Base/System',
        'draw-system': './engine/Systems/DrawSystem',
        'mouse-system': './engine/Systems/MouseSystem',
        'keyboard-system': './engine/Systems/KeyboardSystem',
        'pick-system': './engine/Systems/PickSystem',
        // Engine
        'engine': './engine/Engine'
    };
    configurator.config(paths, function () {
        logging.console('Engine modules have been loaded.');
    });
});