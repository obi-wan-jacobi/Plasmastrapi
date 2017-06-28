require.config({
    paths: {
        // Constants
        'core-constants': './core/Configuration/constants',
        // Components
        'component': './core/Components/Base/Component',
        'curve-component': './core/Components/Components/Geometry/CurveComponent',
        'image-component': './core/Components/Components/Graphics/ImageComponent',
        'mouse-component': './core/Components/Components/Inputs/MouseComponent',
        'keyboard-component': './core/Components/Components/Inputs/KeyboardComponent',
        'line-component': './core/Components/Components/Geometry/LineComponent',
        'mesh-component': './core/Components/Components/Geometry/MeshComponent',
        'pick-component': './core/Components/Components/Inputs/PickComponent',
        'pose-component': './core/Components/Components/Geometry/PoseComponent',
        'sprite-component': './core/Components/Components/Graphics/SpriteComponent',
        'text-label-component': './core/Components/Components/Graphics/TextComponent',
        // Component Mixins
        'drawable': './core/Components/Mixins/Drawable',
        // Data
        'display-settings': './core/Data/Base/DisplaySettings',
        'primitive': './core/Data/Base/Primitive',
        'curve': './core/Data/Geometry/Curve',
        'line': './core/Data/Geometry/Line',
        'mesh': './core/Data/Geometry/Mesh',
        'pose': './core/Data/Geometry/Pose',
        'position': './core/Data/Geometry/Position',
        'rectangle': './core/Data/Geometry/Rectangle',
        'vertex': './core/Data/Geometry/Vertex',
        'image-display-settings': './core/Data/Graphics/DisplaySettings/ImageDisplaySettings',
        'line-display-settings': './core/Data/Graphics/DisplaySettings/LineDisplaySettings',
        'mesh-display-settings': './core/Data/Graphics/DisplaySettings/MeshDisplaySettings',
        'text-display-settings': './core/Data/Graphics/DisplaySettings/TextDisplaySettings',
        'text': './core/Data/Graphics/Text',
        'acceleration': './core/Data/Physics/Acceleration',
        'velocity': './core/Data/Physics/Velocity',
        // Data Handles
        // Data Structures
        'link': './core/DataStructures/Base/Link',
        'dictionary': './core/DataStructures/Dictionary',
        'linked-list': './core/DataStructures/LinkedList',
        // Entity
        // Events

        //Event Mixins
        'destructible': './core/Events/Mixins/Mixins/Destructible',
        'enableable': './core/Events/Mixins/Mixins/Enableable',
        'loadable': './core/Events/Mixins/Mixins/Loadable',
    }
});