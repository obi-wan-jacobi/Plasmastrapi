define(function () {
    var paths = {
        'logging': './utils/Logging/logging',
        'modules': './utils/Modules/modules',
        'validator': './utils/Validation/validator',
        'utils': './utils/utils'
    };
    require.config({ paths: paths });
    return paths;
});