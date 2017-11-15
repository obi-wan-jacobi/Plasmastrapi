define(['logging', 'modules', 'validator', 'utils-config'],
function (logging, modules, validator, config) {

    var utils = {
        logging,
        modules,
        validator,
        config
    };

    // singleton
    return utils;
});