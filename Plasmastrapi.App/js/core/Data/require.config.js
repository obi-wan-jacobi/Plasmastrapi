define(function () {
    require.config({
        paths: {
            // Geometry
            'polygon': './data/Geometry/Polygon',
            'pose': './data/Geometry/Pose',
            'position': './data/Geometry/Position',
            'rectangle': './data/Geometry/Rectangle',
            'vertex': './data/Geometry/Vertex',
            // Graphics
            'image-display-settings': './data/Graphics/DisplaySettings/ImageDisplaySettings',
            'line-display-settings': './data/Graphics/DisplaySettings/LineDisplaySettings',
            'polygon-display-settings': './data/Graphics/DisplaySettings/PolygonDisplaySettings',
            'rectangle-display-settings': './data/Graphics/DisplaySettings/RectangleDisplaySettings',
            'text-display-settings': './data/Graphics/DisplaySettings/TextDisplaySettings',
            // Physics
            'acceleration': './data/Physics/Acceleration',
            'velocity': './data/Physics/Velocity'
        }
    });
});