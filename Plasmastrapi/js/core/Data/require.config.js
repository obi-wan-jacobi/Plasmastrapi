define(function () {
    require.config({
        paths: {
            // Geometry
            'mesh': './data/Geometry/Mesh',
            'pose': './data/Geometry/Pose',
            'position': './data/Geometry/Position',
            'rectangle': './data/Geometry/Rectangle',
            'vertex': './data/Geometry/Vertex',
            // Graphics
            'image-display-settings': './data/Graphics/DisplaySettings/ImageDisplaySettings',
            'line-display-settings': './data/Graphics/DisplaySettings/LineDisplaySettings',
            'mesh-display-settings': './data/Graphics/DisplaySettings/MeshDisplaySettings',
            'text-display-settings': './data/Graphics/DisplaySettings/TextDisplaySettings',
            // Physics
            'acceleration': './data/Physics/Acceleration',
            'velocity': './data/Physics/Velocity'
        }
    });
});