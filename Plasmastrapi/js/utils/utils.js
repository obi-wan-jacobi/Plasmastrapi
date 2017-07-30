define(['configurator', 'logging', 'modules', 'validator'], function (configurator, logging, modules, validator) {

    var utils = {
        configurator,
        logging,
        modules,
        validator
    };

    // singleton
    return utils;
});