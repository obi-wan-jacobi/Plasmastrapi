﻿define(function () {
    var paths = {
        'utils-config': './utils/Configuration/config',
        'logging': './utils/Logging/logging',
        'modules': './utils/Modules/modules',
        'validator': './utils/Validation/validator',
        'utils': './utils/utils'
    };
    require.config({ paths: paths });
    return paths;
});