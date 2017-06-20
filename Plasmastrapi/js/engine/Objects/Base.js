define(['emitter'], function (Emitter) {

    Base.prototype = Object.create(Emitter.prototype);
    Base.prototype.constructor = Base;
    function Base() {
        this.__engine = null;
        // events
        this.__registerEvents(
            'oninjectengine'
        );
    };
    // public prototypal variables
    Object.defineProperties(Base.prototype, {
        'isEngineInjected': {
            get: function () {
                return this.__engine ? true : false;
            }
        }
    });
    // public methods
    Emitter.prototype.injectEngine = function (engine) {
        if (this.__engine) {
            validator.throw(this, 'injectEngine', 'An engine reference has already been injected');
        }
        if (!engine) {
            validator.throw(this, 'injectEngine', 'The engine reference cannot be null');
        }
        this.__engine = engine;
        this.__engine.EmitterContainer.add(this);
        this.emit('oninjectengine', engine);
    };

    return Base;
});