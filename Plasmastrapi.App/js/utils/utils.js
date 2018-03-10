define(['oop', 'logging', 'modules', 'validator', 'utils-config'],
function (oop, logging, modules, validator, config) {

    var utils = {
        oop,
        logging,
        modules,
        validator,
        config
    };

    // singleton
    return utils;
});