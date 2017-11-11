define(['logging', 'modules'], function (logging, modules) {

    var validator = new (function validator() { });

    // throws
    validator.throw = function (referer, methodName, errorString) {
        errorString = logging.error(referer, methodName, errorString);
        throw new Error(errorString);
    };

    validator.throwMethodMustBeOverridden = function (referer, methodName) {
        this.throw(referer, methodName, `${referer.constructor.name} must override inherited method ${methodName}`);
    };

    // validations
    validator.validateNotNull = function (argument) {
        if (argument === null || argument === undefined) {
            this.throw(this, 'validateNotNull', 'Argument cannot be null or undefined');
        }
    };

    validator.validateString = function (argument) {
        if (!(typeof argument === 'string')) {
            this.throw(this, 'validateString', `Argument ${argument} is not a string (${typeof argument})`)
        }
    };

    validator.validateObject = function (argument) {
        this.validateNotNull(argument);
        if (Object.getOwnPropertyNames(argument).length === 0) {
            this.throw(this, 'validateObject', 'Argument must be a valid object');
        }
    };

    validator.validateFunction = function (argument) {
        if (typeof argument !== 'function') {
            this.throw(this, 'validateFunction', 'Argument must be a function');
        }
    };

    validator.isInstanceOfType = function (instance, typeString) {
        if (typeString === 'string' || typeString === 'number') {
            return typeof instance === typeString;
        }
        var Type = modules.require(typeString)
        return instance instanceof Type;
    };

    validator.validateInstanceType = function (referer, instance, typeString) {
        if (instance instanceof Array) {
            if (typeString === 'array') {
                return;
            }
            for (var i = 0, L = instance.length; i < L; i++) {
                this.validateInstanceType(referer, instance[i], typeString);
            }
        } else if (!this.isInstanceOfType(instance, typeString)) {
            this.throw(referer, 'validateInstanceType', `${instance} must be an instance of ${typeString}`);
        }
    };

    validator.isClassOfType = function (classToValidateString, classString) {
        var ClassToValidate = modules.require(classToValidateString);
        var Class = modules.require(classString);
        return (ClassToValidate.prototype instanceof Class);
    };

    validator.validateClassType = function (referer, classToValidateString, classString) {
        if (!this.isClassOfType(classToValidateString, classString)) {
            this.throw(referer, 'validateInstanceType', `${classToValidateString} must inherit from ${classString}`);
        }
    };

    // emitter validations
    validator.validateEventIsRegistered = function (emitter, event) {
        if (!emitter.hasEvent(event)) {
            this.throw(emitter, 'validateEventIsRegistered', `${emitter.constructor.name} has no registered \'${event}\' event`);
        }
    };

    // entity validations
    validator.validateEntityHasComponent = function (referer, entity, componentString) {
        var component = entity.getComponent(componentString);
        if (!component) {
            this.throw(referer, 'validateEntityHasComponent', `Target entity (${entity.constructor.name}) must possess a ${componentString}`);
        }
        return component;
    };

    // singleton
    return validator;
});