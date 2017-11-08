define(function () {
    var paths = {
        // Attributes
        'compatibility-attribute': './tools/Compatibility/Attributes/Base/CompatibilityAttribute',
        // Compatibility Filters
        'compatibility-filter': './tools/Compatibility/Filters/Base/CompatibilityFilter',
        // Input Handlers
        'placing-tool': './tools/InputHandlers/PlacingTool',
        // Factories
        'helper-factory': './tools/Factories/HelperFactory',
        // Helpers
        'hit-box': './tools/Helpers/HitBox',
        'selection-box': './tools/Helpers/SelectionBox'
    };
    require.config({ paths: paths });
    return paths;
});