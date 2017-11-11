define(['factory', 'emitter-container', 'utils'],
function (Factory, EmitterContainer, utils) {

    EmitterFactory.prototype = Object.create(Factory.prototype);
    EmitterFactory.prototype.constructor = EmitterFactory;
    function EmitterFactory(engine) {
        Factory.call(this, engine);
        this.__container = new EmitterContainer();
    };
    // public methods
    EmitterFactory.prototype.create = function (emitterString, args) {
        var args = args instanceof Array ? args : [args];
        var EmitterType = utils.modules.require(emitterString);
        var emitter = new (EmitterType.bind.apply(EmitterType, [null].concat(args)))();
        this.__container.add(emitter);
        return emitter;
    };
    EmitterFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return EmitterFactory;
});