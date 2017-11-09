define(function () {
    var paths = {
        // Attributes
        'compatibility-attribute': './lab/Compatibility/Attributes/Base/CompatibilityAttribute',
        // Compatibility Filters
        'compatibility-filter': './lab/Compatibility/Filters/Base/CompatibilityFilter',
        // Input Handlers
        'placing-tool': './lab/InputHandlers/PlacingTool',
        // Factories
        'helper-factory': './lab/Factories/HelperFactory',
        // Helpers
        'hit-box': './lab/Helpers/HitBox',
        'selection-box': './lab/Helpers/SelectionBox'
    };
    require.config({ paths: paths });
    return paths;
});