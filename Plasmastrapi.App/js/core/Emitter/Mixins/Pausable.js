define(['emitter', 'validator'], function (Emitter, validator) {

    function Pausable() {
        var target = this;
        validator.validateInstanceType(target, target, Emitter);
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
        target.registerEvents(
            'onframe',
            'onpause',
            'onunpause'
        );
    };
    Pausable.prototype.loopOnce = function (deltaMs) {
        if (this.isLoaded && !this.isPaused) {
            this.emit('onframe', deltaMs);
            return true;
        }
        return false;
    };
    Pausable.prototype.pause = function () {
        if (this.__isPaused) {
            return;
        }
        this.__isPaused = true;
        this.emit('onpause');
    };
    Pausable.prototype.unpause = function () {
        if (!this.__isPaused) {
            return;
        }
        this.__isPaused = false;
        this.emit('onunpause');
    };
    Pausable.prototype.restart = function () {
        this.pause();
        this.unpause();
        if (this.isLoadable) {
            this.reload();
        }
    };

    return Pausable;
});