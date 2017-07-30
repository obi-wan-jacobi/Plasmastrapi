define(['validator'], function (validator) {

    var modules = {};

    modules.getModulePrefix = function (instanceOrType, typeSuffix) {
        var moduleName = null;
        if (typeof instanceOrType === 'function') {
            moduleName = instanceOrType.name;
        } else {
            moduleName = instanceOrType.constructor.name;
        }
        // Ex. ConstructorNameTypeSuffix --> constructor-name 
        return moduleName.split(typeSuffix)[0].split(/(?=[A-Z])/).join('-').toLowerCase();
    };

    modules.require = function (moduleName) {
        var module = null;
        try {
            module = require(moduleName);
        } catch (e) {
            validator.throw(modules, 'require', e);
        }
        return module;
    };

    return modules;
});