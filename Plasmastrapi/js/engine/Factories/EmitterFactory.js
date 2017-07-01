define(['factory', 'emitter-container', 'emitter', 'validator'],
    function (Factory, EmitterContainer, Emitter, validator) {

        EmitterFactory.prototype = Object.create(Factory.prototype);
        EmitterFactory.prototype.constructor = EmitterFactory;
        function EmitterFactory(engine) {
            Factory.call(this, engine);
            this.__container = new EmitterContainer();
        };
        // private methods
        EmitterFactory.prototype.__onEmitterDestroy = function (emitter) {
            this.__container.remove(emitter);
        };
        // public methods
        EmitterFactory.prototype.create = function (EmitterType) {
            var emitter = new EmitterType();
            validator.validateType(this, emitter, Emitter);
            this.__container.add(emitter);
            emitter.addEventListener('ondestroy', this, this.__onEmitterDestroy.bind(this, emitter));
            return emitter;
        };
        EmitterFactory.prototype.getContainer = function () {
            return this.__container;
        };

        return EmitterFactory;
    });