define(function () {
    var paths = {
        'mock-canvas': './tests/Mocks/MockCanvas',
        'mock-canvas-context': './tests/Mocks/MockCanvasContext'
    };
    require.config({ paths: paths });
    return paths;
});