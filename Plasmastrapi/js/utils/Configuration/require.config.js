define(function () {
    var paths = {
        // Logging
        'logging': './utils/Logging/logging',
        // Modules
        'modules': './utils/Modules/modules',
        // Validation
        'validator': './utils/Validation/validator',
        // Utils
        'utils': './utils/utils'
    };
    require.config({ paths: paths });
    return paths;
});