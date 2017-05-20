var require = {
    baseUrl: 'Scripts/app/',
    paths: {
        // Components
        'curve-component': './engine/Components/CurveComponent',
        'image-component': './engine/Components/ImageComponent',
        'input-component': './engine/Components/InputComponent',
        'line-component': './engine/Components/LineComponent',
        'mesh-component': './engine/Components/MeshComponent',
        'pickable-component': './engine/Components/PickableComponent',
        'pose-component': './engine/Components/PoseComponent',
        'sprite-component': './engine/Components/SpriteComponent',
        'text-label-component': './engine/Components/TextLabelComponent',
        // Component Mixins
        'drawable': './engine/Components/Mixins/Drawable',
        // Containers
        'entity-container': './engine/Containers/EntityContainer',
        'event-emitter-container': './engine/Containers/EventEmitterContainer',
        'pickable-component-container': './engine/Containers/PickableComponentContainer',
        // Data
        'geometry': './engine/Data/Geometry',
        'graphics': './engine/Data/Graphics',
        'physics': './engine/Data/Physics',
        // Loaders
        'image-loader': './engine/Loaders/ImageLoader',
        'sprite-loader': './engine/Loaders/SpriteLoader',
        // Objects
        'atomic-array': './engine/Objects/AtomicArray',
        'atomic-keypair-array': './engine/Objects/AtomicKeyPairArray',
        'atomic-link': './engine/Objects/AtomicLink',
        'base': './engine/Objects/Base',
        'component': './engine/Objects/Component',
        'container': './engine/Objects/Container',
        'controller': './engine/Objects/Controller',
        'entity': './engine/Objects/Entity',
        'event-emitter': './engine/Objects/EventEmitter',
        'event-queue': './engine/Objects/EventQueue',
        'input-handle': './engine/Objects/InputHandle',
        'loader': './engine/Objects/Loader',
        'scene': './engine/Objects/Scene',
        'system': './engine/Objects/System',
        // Object Mixins
        'destructible': './engine/Objects/Mixins/Destructible',
        'loadable': './engine/Objects/Mixins/Loadable',
        'pausable': './engine/Objects/Mixins/Pausable',
        // Systems
        'collision-system': './engine/Systems/CollisionSystem',
        'draw-system': './engine/Systems/DrawSystem',
        'input-system': './engine/Systems/InputSystem',
        'motion-system': './engine/Systems/MotionSystem',
        'pick-system': './engine/Systems/PickSystem',
        // Configs
        'engine-debug': './engine/debug',
        'engine-config': './engine/config',
        // Base
        'engine': './engine/Engine'
    }
};