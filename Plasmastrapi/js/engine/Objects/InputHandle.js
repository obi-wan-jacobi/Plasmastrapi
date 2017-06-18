define(['emitter'],
function (Emitter) {

    InputHandle.prototype = Object.create(Emitter.prototype);
    InputHandle.prototype.constructor = InputHandle;
    function InputHandle() {
        Emitter.call(this);
        // private variables
        this.__isMouseDown = false;
        this.__isShiftKeyDown = false;
        // apply mixins
        Emitter.Mixins.Loadable.call(this);
        this.__registerEvents(
            'onmousemove',
		    'onmousedown',
		    'onmouseup',
		    'onclick',
            'onkeydown',
		    'onkeyup'
        );
    };
    // public prototypal variables
    Object.defineProperties(InputHandle.prototype, {
        'isMouseDown': {
            get: function () {
                return this.__isMouseDown;
            }
        },
        'isShiftKeyDown': {
            get: function () {
                return this.__isShiftKeyDown;
            }
        }
    });
    InputHandle.prototype.keyCodes = {
        shift: 16,
        escape: 27
    };
    // private methods
    InputHandle.prototype.__onload = function () {
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$onmousemove);
        this.__engine.inputSystem.addEventListener('onmousedown', this, this.__$onmousedown);
        this.__engine.inputSystem.addEventListener('onmouseup', this, this.__$onmouseup);
        this.__engine.inputSystem.addEventListener('onclick', this, this.__$onclick);
        this.__engine.inputSystem.addEventListener('onkeydown', this, this.__$onkeydown);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__$onkeyup);
    };
    InputHandle.prototype.__onunload = function () {
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__$onmousemove);
        this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__$onmousedown);
        this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__$onmouseup);
        this.__engine.inputSystem.removeEventListener('onclick', this, this.__$onclick);
        this.__engine.inputSystem.removeEventListener('onkeydown', this, this.__$onkeydown);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__$onkeyup);
    };
    InputHandle.prototype.__onmousedown = function () {
        this.__isMouseDown = true;
    };
    InputHandle.prototype.__onmouseup = function () {
        this.__isMouseDown = false;
    };
    InputHandle.prototype.__onkeydown = function (keyCode) {
        if (this.keyCodes.shift === keyCode) {
            this.__isShiftKeyDown = true;
        }
    };
    InputHandle.prototype.__onkeyup = function (keyCode) {
        if (this.keyCodes.shift === keyCode) {
            this.__isShiftKeyDown = false;
        }
    };

    return InputHandle;
});