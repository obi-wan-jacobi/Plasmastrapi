define(['factory'],
function (Factory) {

    EmitterFactory.prototype = Object.create(Factory.prototype);
    EmitterFactory.prototype.constructor = EmitterFactory;
    function EmitterFactory(engine) {
        Factory.call(this, engine, 'emitter', 'emitter-container');
    };

    return EmitterFactory;
});