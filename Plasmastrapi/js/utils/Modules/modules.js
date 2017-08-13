define(['validator'], function (validator) {

    var modules = {
        constructor: {
            name: 'modules'
        }
    };

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
    }

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

    // singleton
    return modules;
});