define(['validator', 'logging'], function (validator, logging) {

    var modules = new (function modules() { });

    modules.load = function (pathsObject, callback) {
        // Pre-loads named modules
        var modulePaths = [];
        for (var property in pathsObject) {
            if (pathsObject.hasOwnProperty(property)) {
                modulePaths.push(property);
            }
        }
        require(modulePaths, function () {
            callback();
        });
    };

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

    modules.getModuleName = function (instanceOrType) {
        return this.getModulePrefix(instanceOrType, null);
    };

    modules.require = validator.__require;

    modules.requireIfExists = function (moduleName) {
        validator.validateString(moduleName);
        var module = null;
        try {
            module = require(moduleName);
        } catch (ex) {
            logging.info(modules, 'requireIfExists', `No module named \'${moduleName}\' could be found`);
        }
        return module;
    };

    // singleton
    return modules;
});