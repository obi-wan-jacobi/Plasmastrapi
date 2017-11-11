define(['validator'], function (validator) {

    function Enableable() {
        var target = this;
        validator.validateInstanceType(target, target, 'emitter');
        target.__isEnabled = true;
        Object.defineProperties(target, {
            'isEnableable': {
                get: function () {
                    return true;
                }
            },
            'isEnabled': {
                get: function () {
                    return this.__isEnabled;
                }
            }
        });
        target.enable = Enableable.prototype.enable;
        target.disable = Enableable.prototype.disable;
        target.registerEvents(
            'onenable',
            'ondisable'
        );
    };
    Enableable.prototype.enable = function () {
        if (this.__isEnabled) {
            return;
        }
        this.__isEnabled = true;
        this.emit('onenable');
    };
    Enableable.prototype.disable = function () {
        if (!this.__isEnabled) {
            return;
        }
        this.__isEnabled = false;
        this.emit('ondisable');
    };

    return Enableable;
});