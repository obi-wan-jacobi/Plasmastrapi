require.config({
    paths: {
        // Components
        'curve-component': './engine/Components/CurveComponent',
        'image-component': './engine/Components/ImageComponent',
        'input-component': './engine/Components/InputComponent',
        'line-component': './engine/Components/LineComponent',
        'mesh-component': './engine/Components/MeshComponent',
        'pick-component': './engine/Components/PickComponent',
        'pose-component': './engine/Components/PoseComponent',
        'sprite-component': './engine/Components/SpriteComponent',
        'text-label-component': './engine/Components/TextLabelComponent',
        // Component Mixins
        'drawable': './engine/Components/Mixins/Drawable',
        // Containers
        'entity-container': './engine/Containers/EntityContainer',
        'event-emitter-container': './engine/Containers/EventEmitterContainer',
        'pick-component-container': './engine/Containers/PickComponentContainer',
        // Objects
        'linked-list': './engine/Objects/LinkedList',
        'dictionary': './engine/Objects/Dictionary',
        'link': './engine/Objects/Link',
        'base': './engine/Objects/Base',
        'component': './engine/Objects/Component',
        'container': './engine/Objects/Container',
        'controller': './engine/Objects/Controller',
        'entity': './engine/Objects/Entity',
        'event-emitter': './engine/Objects/EventEmitter',
        'event-queue': './engine/Objects/EventQueue',
        'input-handle': './engine/Objects/InputHandle',
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
});