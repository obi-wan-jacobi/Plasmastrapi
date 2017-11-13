define(['logging', 'utils-config'], function (logging, config) {

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

    modules.getBasePrimitiveModuleName = function (primitiveString) {
        var validator = require('validator');
        var Primitive = this.require('primitive');
        var PrimitiveType = this.require(primitiveString);
        var primitive = new (Function.prototype.bind.apply(PrimitiveType, [null]))();
        validator.validateInstanceType(this, primitive, 'primitive');
        var baseClass = primitive;
        while (Object.getPrototypeOf(baseClass).constructor.name !== Primitive.name) {
            baseClass = Object.getPrototypeOf(baseClass);
        }
        return this.getModuleName(baseClass);
    };

    modules.__require = function (moduleName, mode) {
        var validator = require('validator');
        validator.validateString(moduleName);
        if (config.nativeTypes[moduleName]) {
            return config.nativeTypes[moduleName];
        }
        var module = null;
        try {
            module = require(moduleName);
        } catch (ex) {
            if (mode === 'strict') {
                validator.throw(this, 'require', `No module named \'${moduleName}\' could be found`);
            } else {
                if (config.isInfoLoggingActiveOnFailedRequires) {
                    logging.info(this, 'requireIfExists', `No module named \'${moduleName}\' could be found`);
                }
            }
        }
        return module;
    };

    modules.requireIfExists = function (moduleName) {
        return this.__require(moduleName, null);
    };

    modules.require = function (moduleName) {
        return this.__require(moduleName, 'strict');
    };

    // singleton
    return modules;
});