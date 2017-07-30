define(function () {

    var validator = {};

    // throws
    validator.throw = function (Type, methodName, errorString) {
        if (errorString[errorString.length - 1] !== '.') {
            errorString += '.';
        }
        throw new Error(Type.constructor.name + '::' + methodName + ' -- ' + errorString);
    };

    validator.throwMethodMustBeOverridden = function (Type, methodName) {
        this.throw(Type, methodName, Type.constructor.name + ' must override inherited method ' + methodName);
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

    validator.validateType = function (Type, instance, Type) {
        if (instance instanceof Array) {
            for (var i = 0, L = instance.length; i < L; i++) {
                this.validateType(Type, instance[i], Type);
            }
        } else if (typeof instance !== Type && !(instance instanceof Type)) {
            this.throw(Type, 'validateType', instance + ' must be an instance of ' + Type.name);
        }
    };

    // emitter validations
    validator.validateEventIsRegistered = function (emitter, event) {
        if (!emitter.hasEvent(event)) {
            this.throw(emitter, 'validateEventIsRegistered', emitter.constructor.name + ' has no registered \'' + event + '\' event');
        }
    };

    // entity validations
    validator.validateEntityHasComponent = function (Type, entity, Component) {
        var component = entity.getComponent(Component);
        if (!component) {
            this.throw(Type, 'validateEntityHasComponent', 'Target entity (' + entity.constructor.name + ') must possess a ' + Component.name);
        }
        return component;
    };

    // singleton
    return validator;
});