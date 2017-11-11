define(function () {
    var paths = {
        // Configuration
        'engine-config': './engine/Configuration/config',
        'engine-debug': './engine/Configuration/debug',
        // Base
        'base': './engine/Base/Base',
        // Containers
        'container': './engine/Containers/Base/Container',
        'component-container': './engine/Containers/Base/ComponentContainer',
        'drawable-component-container': './engine/Containers/DrawableComponentContainer',
        'emitter-container': './engine/Containers/EmitterContainer',
        'entity-container': './engine/Containers/EntityContainer',
        'pick-component-container': './engine/Containers/PickComponentContainer',
        // Controllers
        'controller': './engine/Controllers/Base/Controller',
        'input-controller': './engine/Controllers/InputController',
        'pick-controller': './engine/Controllers/PickController',
        'scene-controller': './engine/Controllers/SceneController',
        'viewport-controller': './engine/Controllers/ViewportController',
        // Factories
        'factory': './engine/Factories/Base/Factory',
        'component-factory': './engine/Factories/ComponentFactory',
        'emitter-factory': './engine/Factories/EmitterFactory',
        'entity-factory': './engine/Factories/EntityFactory',
        // Input Handlers
        'input-handler': './engine/InputHandlers/Base/InputHandler',
        'empty-handler': './engine/InputHandlers/EmptyHandler',
        // Loaders
        'asset-loader': './engine/Loaders/AssetLoader',
        // Systems
        'system': './engine/Systems/Base/System',
        'draw-system': './engine/Systems/DrawSystem',
        'keyboard-system': './engine/Systems/KeyboardSystem',
        'mouse-system': './engine/Systems/MouseSystem',
        'pick-system': './engine/Systems/PickSystem',
        // Scenes
        'scene': './engine/Scenes/Base/Scene',
        // Engine
        'engine': './engine/Engine'
    };
    require.config({ paths: paths });
    return paths;
});