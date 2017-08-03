define(['factory', 'emitter-container', 'emitter', 'validator'],
    function (Factory, EmitterContainer, Emitter, validator) {

        EmitterFactory.prototype = Object.create(Factory.prototype);
        EmitterFactory.prototype.constructor = EmitterFactory;
        function EmitterFactory() {
            Factory.call(this, Emitter);
            this.__container = new EmitterContainer();
        };
        // public methods
        EmitterFactory.prototype.create = function (EmitterType, args) {
            var emitter = new (EmitterType.bind(null, args instanceof Array ? args : [args]))();
            validator.validateType(this, emitter, Emitter);
            this.__container.add(emitter);
            emitter.addEventListener('ondestroy', this, this.__container.remove.bind(this, emitter));
            return emitter;
        };
        EmitterFactory.prototype.getContainer = function () {
            return this.__container;
        };

        return EmitterFactory;
    });