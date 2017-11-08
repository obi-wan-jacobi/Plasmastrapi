define(['logging'], function (logging) {

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

    validator.isInstanceOfType = function (instance, Type) {
        return typeof instance !== Type && !(instance instanceof Type);
    };

    validator.validateInstanceType = function (referer, instance, Type) {
        if (instance instanceof Array) {
            if (Type === Array) {
                return;
            }
            for (var i = 0, L = instance.length; i < L; i++) {
                this.validateInstanceType(referer, instance[i], Type);
            }
        } else if (this.isInstanceOfType(instance, Type)) {
            this.throw(referer, 'validateInstanceType', `${instance} must be an instance of ${Type.name}`);
        }
    };

    validator.isClassOfType = function (ClassToValidate, Class) {
        return !(ClassToValidate.prototype instanceof Class) && ClassToValidate.prototype.constructor.name !== Class.name;
    };

    validator.validateClassType = function (referer, ClassToValidate, Class) {
        if (this.isClassOfType(ClassToValidate, Class)) {
            this.throw(referer, 'validateInstanceType', `${ClassToValidate.name} must inherit from ${Class.name}`);
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