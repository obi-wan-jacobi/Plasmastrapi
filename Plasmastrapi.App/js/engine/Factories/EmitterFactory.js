define(['factory', 'emitter-container', 'validator'],
    function (Factory, EmitterContainer, validator) {

        EmitterFactory.prototype = Object.create(Factory.prototype);
        EmitterFactory.prototype.constructor = EmitterFactory;
        function EmitterFactory(engine) {
            Factory.call(this, engine);
            this.__container = new EmitterContainer();
        };
        // public methods
        EmitterFactory.prototype.create = function (EmitterType, args) {
            var args = args instanceof Array ? args : [args];
            var emitter = new (EmitterType.bind.apply(EmitterType, [null].concat(args)))();
            this.__container.add(emitter);
            return emitter;
        };
        EmitterFactory.prototype.getContainer = function () {
            return this.__container;
        };

        return EmitterFactory;
    });