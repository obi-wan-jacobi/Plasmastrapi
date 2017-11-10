define(function () {
    var paths = {
        // Configuration
        'core-config': './core/Configuration/config',
        'core-constants': './core/Configuration/constants',
        'core-debug': './core/Configuration/debug',
        // Components
        'component': './core/Components/Base/Component',
            // -- Geometry --
            'curve-component': './core/Components/Geometry/CurveComponent',
            'line-component': './core/Components/Geometry/LineComponent',
            'polygon-component': './core/Components/Geometry/PolygonComponent',
            'pose-component': './core/Components/Geometry/PoseComponent',
            // -- Graphics --
            'image-component': './core/Components/Graphics/ImageComponent',
            'sprite-component': './core/Components/Graphics/SpriteComponent',
            'text-component': './core/Components/Graphics/TextComponent',
            // -- Inputs --
            'keyboard-component': './core/Components/Inputs/KeyboardComponent',
            'mouse-component': './core/Components/Inputs/MouseComponent',
            'pick-component': './core/Components/Inputs/PickComponent',
        // Data
        'display-settings': './core/Data/Base/DisplaySettings',
        'primitive': './core/Data/Base/Primitive',
            // -- Geometry --
            'curve': './core/Data/Geometry/Curve',
            'line': './core/Data/Geometry/Line',
            'polygon': './core/Data/Geometry/Polygon',
            'pose': './core/Data/Geometry/Pose',
            'position': './core/Data/Geometry/Position',
            'rectangle': './core/Data/Geometry/Rectangle',
            'vertex': './core/Data/Geometry/Vertex',
            // -- Graphics --
            'image-display-settings': './core/Data/Graphics/DisplaySettings/ImageDisplaySettings',
            'line-display-settings': './core/Data/Graphics/DisplaySettings/LineDisplaySettings',
            'polygon-display-settings': './core/Data/Graphics/DisplaySettings/PolygonDisplaySettings',
            'pose-display-settings': './core/Data/Graphics/DisplaySettings/PoseDisplaySettings',
            'text-display-settings': './core/Data/Graphics/DisplaySettings/TextDisplaySettings',
            'text': './core/Data/Graphics/Text',
            // -- Physics --
            'acceleration': './core/Data/Physics/Acceleration',
            'velocity': './core/Data/Physics/Velocity',
        // Data Handles
        'data-handle': './core/DataHandles/Base/DataHandle',
            // -- Geometry --
            'curve-handle': './core/DataHandles/Geometry/CurveHandle',
            'line-handle': './core/DataHandles/Geometry/LineHandle',
            'polygon-handle': './core/DataHandles/Geometry/PolygonHandle',
            'pose-handle': './core/DataHandles/Geometry/PoseHandle',
            // -- Graphics --
            'image-handle': './core/DataHandles/Graphics/ImageHandle',
            'sprite-frame-handle': './core/DataHandles/Graphics/SpriteFrameHandle',
            'sprite-handle': './core/DataHandles/Graphics/SpriteHandle',
            'text-handle': './core/DataHandles/Graphics/TextHandle',
            // -- Inputs --
            'keyboard-handle': './core/DataHandles/Inputs/KeyboardHandle',
            'mouse-handle': './core/DataHandles/Inputs/MouseHandle',
            'pick-handle': './core/DataHandles/Inputs/PickHandle',
        // Data Structures
        'dictionary': './core/DataStructures/Dictionary',
        'link': './core/DataStructures/Link',
        'linked-list': './core/DataStructures/LinkedList',
        // Emitter
        'emitter': './core/Emitter/Emitter',
            // --- Mixins ---
            'destructible': './core/Emitter/Mixins/Destructible',
            'drawable': './core/Emitter/Mixins/Drawable',
            'enableable': './core/Emitter/Mixins/Enableable',
            'loadable': './core/Emitter/Mixins/Loadable',
            'pausable': './core/Emitter/Mixins/Pausable',
        // Entity
        'entity': './core/Entity/Entity'
    };
    require.config({ paths: paths });
    return paths;
});