define(['logging', 'modules', 'validator'],
function (logging, modules, validator) {

    var utils = {
        logging,
        modules,
        validator
    };

    // singleton
    return utils;
});