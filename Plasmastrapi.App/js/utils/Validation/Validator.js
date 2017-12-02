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

    // checks
    validator.isNullOrUndefined = function (argument) {
        return argument === null || argument === undefined;
    };

    validator.isInstanceOfType = function (instance, typeString) {
        if (typeString === 'string' || typeString === 'number') {
            return typeof instance === typeString;
        }
        var Type = modules.require(typeString)
        return instance instanceof Type || instance.constructor === Type;
    };

    validator.isClassOfType = function (classString, typeString) {
        var ClassToValidate = modules.require(classString);
        return this.isInstanceOfType(ClassToValidate.prototype, typeString);
    };

    // validations
    validator.validateNotNull = function (referer, argument) {
        if (this.isNullOrUndefined(argument)) {
            this.throw(this, 'validateNotNull', 'Argument cannot be null or undefined');
        }
    };

    validator.validateObject = function (referer, argument) {
        this.validateNotNull(referer, argument);
        if (Object.getOwnPropertyNames(argument).length === 0) {
            this.throw(referer, 'validateObject', 'Argument must be a \'non-empty\' object');
        }
    };

    validator.validateFunction = function (referer, argument) {
        if (typeof argument !== 'function') {
            this.throw(referer, 'validateFunction', 'Argument must be a function');
        }
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

    validator.validateClassType = function (referer, classString, typeString) {
        if (!this.isClassOfType(classString, typeString)) {
            this.throw(referer, 'validateClassType', `${classString} must inherit from ${typeString}`);
        }
    };

    // emitter validations
    validator.validateEventIsRegistered = function (emitter, event) {
        if (!emitter.hasEvent(event)) {
            this.throw(emitter, 'validateEventIsRegistered', `${emitter.constructor.name} has no registered \'${event}\' event`);
        }
    };

    // singleton
    return validator;
});