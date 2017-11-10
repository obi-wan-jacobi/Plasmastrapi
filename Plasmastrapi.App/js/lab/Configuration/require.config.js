define(function () {
    var paths = {
        // Controllers
        'lab-controller': './lab/Controllers/LabController',
        // Factories
        //'helper-factory': './lab/Factories/HelperFactory',
        // Input Handlers
        'placing-tool': './lab/InputHandlers/PlacingTool',
    };
    require.config({ paths: paths });
    return paths;
});