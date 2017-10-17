define(function () {
    var paths = {
        // Attributes
        'compatibility-attribute': './tools/Compatibility/Attributes/Base/CompatibilityAttribute',
        // Compatibility Filters
        'compatibility-filter': './tools/Compatibility/Filters/Base/CompatibilityFilter',
        // Input Handlers
        'input-handler': './tools/InputHandlers/Base/InputHandler'
    };
    require.config({ paths: paths });
    return paths;
});