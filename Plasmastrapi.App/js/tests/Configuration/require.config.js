define(function () {
    var paths = {
        'mock': './tests/Mocks/Base/Mock',
        'mock-viewport': './tests/Mocks/MockViewport'
    };
    require.config({ paths: paths });
    return paths;
});