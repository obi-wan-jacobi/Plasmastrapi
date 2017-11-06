define(function () {
    var paths = {
        'base': './engine/Base/Base',
        // Containers
        'container': './engine/Containers/Base/Container',
        'component-container': './engine/Containers/Base/ComponentContainer',
        'drawable-component-container': './engine/Containers/DrawableComponentContainer',
        'pick-component-container': './engine/Containers/PickComponentContainer',
        'emitter-container': './engine/Containers/EmitterContainer',
        'entity-container': './engine/Containers/EntityContainer',
        // Controllers
        // Factories
        'factory': './engine/Factories/Base/Factory',
        'emitter-factory': './engine/Factories/EmitterFactory',
        'component-factory': './engine/Factories/ComponentFactory',
        'entity-factory': './engine/Factories/EntityFactory',
        // Systems
        'system': './engine/Systems/Base/System',
        'draw-system': './engine/Systems/DrawSystem',
        'mouse-system': './engine/Systems/MouseSystem',
        'keyboard-system': './engine/Systems/KeyboardSystem',
        'pick-system': './engine/Systems/PickSystem',
        // Loaders
        'asset-loader': './engine/Loaders/AssetLoader',
        // Engine
        'engine': './engine/Engine'
    };
    require.config({ paths: paths });
    return paths;
});