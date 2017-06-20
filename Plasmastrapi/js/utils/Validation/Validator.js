define(function () {

    function Validator() { };
    Validator.prototype.throw = function (ref, methodName, errorString) {
        if (errorString[errorString.length - 1] !== '.') {
            errorString += '.';
        }
        throw new Error(ref.constructor.name + '::' + methodName + ' -- ' + errorString);
    };
    Validator.prototype.validateNotNull = function (object) {
        if (!object) {
            validator.throw(this, 'validateObject', 'Argument cannot be null');
        }
    };
    Validator.prototype.validateObject = function (object) {
        this.validateNotNull(object);
        if (Object.getOwnPropertyNames(object).length === 0) {
            validator.throw(this, 'validateObject', 'Subscribers cannot be empty objects');
        }
    };
    Validator.prototype.validateFunction = function (fn) {
        if (typeof fn !== 'function') {
            validator.throw(this, 'validateMethod', 'Argument must be a function');
        }
    };
    Validator.prototype.validateType = function (ref, instance, Type) {
        if (instance instanceof Array) {
            for (var i = 0, L = instance.length; i < L; i++) {
                this.validateType(ref, instance[i], Type);
            }
        } else if (typeof instance !== Type || !(instance instanceof Type)) {
            this.throw(ref, 'validateType', instance + ' must be an instance of ' + Type.name);
        }
    };
    Validator.prototype.validateEntityHasComponent = function (ref, entity, Component) {
        var component = entity.getComponent(Component);
        if (!component) {
            validator.throw(ref, 'validateEntityHasComponent', 'Target\'s entity (' + entity.constructor.name + ') must possess a ' + Component.name);
        }
        return component;
    };
    Validator.prototype.validateEventIsImplemented = function (emitter, event) {
        if (!emitter.hasEvent(event)) {
            this.throw(emitter, 'validateEventIsImplemented', emitter.constructor.name + ' does not implement event ' + event);
        }
    };

    return new Validator();
});