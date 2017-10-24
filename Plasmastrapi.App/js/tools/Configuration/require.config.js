define(function () {
    var paths = {
        // Attributes
        'compatibility-attribute': './tools/Compatibility/Attributes/Base/CompatibilityAttribute',
        'pickable': './tools/Compatibility/Attributes/Pickable',
        'placeable': './tools/Compatibility/Attributes/Placeable',
        // Compatibility Filters
        'compatibility-filter': './tools/Compatibility/Filters/Base/CompatibilityFilter',
        // Input Handlers
        'input-handler': './tools/InputHandlers/Base/InputHandler',
        'picking-tool': './tools/InputHandlers/PickingTool',
        // Factories
        'helper-factory': './tools/Factories/HelperFactory',
        // Helpers
        'hit-box': './tools/Helpers/HitBox',
        'selection-box': './tools/Helpers/SelectionBox'
    };
    require.config({ paths: paths });
    return paths;
});