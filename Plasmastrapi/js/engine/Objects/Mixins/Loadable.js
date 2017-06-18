define([], function () {

    function Loadable(isLoadedByEngine) {
        var target = this;
        if (!target.registerEvents) {
            validator.throw(target.constructor.name, Loadable.constructor.name, 'Target must be an instance of Emitter');
        }
        target.__isLoaded = false;
        target.__isInitialized = false;
        Object.defineProperties(target, {
            'isLoadable': {
                get: function () {
                    return true;
                }
            },
            'isLoaded': {
                get: function () {
                    return this.__isLoaded;
                }
            },
            'isInitialized': {
                get: function () {
                    return this.__isInitialized;
                }
            }
        });
        target.load = Loadable.prototype.load;
        target.unload = Loadable.prototype.unload;
        target.reload = Loadable.prototype.reload;
        target.registerEvents(
            'oninit',
            'onload',
            'onunload'
        );
        if (isLoadedByEngine) {
            var fnInjectEngineProxy = target.injectEngine || function () { };
            target.injectEngine = function (engine) {
                fnInjectEngineProxy.call(target, engine);
                Loadable.prototype.injectEngine.call(target, engine);
            };
        }
    };
    Loadable.prototype.injectEngine = function (engine) {
        this.__engine.addEventListener('onload', this, this.load);
        this.__engine.addEventListener('onunload', this, this.unload);
    };
    Loadable.prototype.load = function () {
        if (!this.isEngineInjected) {
            validator.throw(this, 'load', 'This object cannot be loaded without first receiving an engine instance');
        }
        if (!this.__isLoaded) {
            this.__isLoaded = true;
            if (!this.__isInitialized) {
                this.__isInitialized = true;
                this.__fire('oninit');
            }
            this.__fire('onload');
        }
    };
    Loadable.prototype.unload = function () {
        if (this.__isLoaded) {
            this.__isLoaded = false;
            this.__fire('onunload');
        }
    };
    Loadable.prototype.reload = function () {
        this.unload();
        this.load();
    };

    return Loadable;
});