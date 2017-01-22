﻿define([], function () {

    function Pausable(isPausedWithEngine) {
        var target = this;
        if (!(target.__registerEvents)) {
            throw new Error(Pausable.name + ':constructor - Target must be an instance of EventEmitter');
        }
        target.__isPaused = false;
        Object.defineProperties(target, {
            'isPausable': {
                get: function () {
                    return true;
                }
            },
            'isPaused': {
                get: function () {
                    return this.__isPaused;
                }
            }
        });
        target.loopOnce = Pausable.prototype.loopOnce;
        target.pause = Pausable.prototype.pause;
        target.unpause = Pausable.prototype.unpause;
        target.restart = Pausable.prototype.restart;
        target.__registerEvents(
            'onframe',
            'onpause',
            'onunpause'
        );
        if (isPausedWithEngine) {
            var fnInstantiate = target.instantiate || function () { };
            target.instantiate = function (engine) {
                fnInstantiate.call(target, engine);
                Pausable.prototype.instantiate.call(target, engine);
            };
        }
    };
    Pausable.prototype.instantiate = function (engine) {
        this.__engine.addEventListener('onpause', this, this.pause);
        this.__engine.addEventListener('onunpause', this, this.unpause);
    };
    Pausable.prototype.loopOnce = function (deltaMs) {
        if (this.isLoaded && !this.isPaused) {
            this.__fire('onframe', deltaMs);
            return true;
        }
        return false;
    };
    Pausable.prototype.pause = function () {
        if (!this.__isPaused) {
            this.__isPaused = true;
            this.__fire('onpause');
        }
    };
    Pausable.prototype.unpause = function () {
        if (this.__isPaused) {
            this.__isPaused = false;
            this.__fire('onunpause');
        }
    };
    Pausable.prototype.restart = function () {
        this.unpause();
        if (this.isLoadable) {
            this.reload();
        }
    };

    return Pausable;
});