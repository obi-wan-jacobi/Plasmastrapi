define(['handle'],
function (Handle) {

    KeyboardHandle.prototype = Object.create(Handle.prototype);
    KeyboardHandle.prototype.constructor = KeyboardHandle;
    function KeyboardHandle() {
        Handle.call(this);
        // private variables
        this.__keysDown = [];
        this.__isShiftKeyDown = false;
        this.__isCtrlKeyDown = false;
    };
    // public prototypal variables
    Object.defineProperties(KeyboardHandle.prototype, {
        'isShiftKeyDown': {
            get: function () {
                return this.__isShiftKeyDown;
            }
        },
        'isCtrlKeyDown': {
            get: function () {
                return this.__isCtrlKeyDown;
            }
        }
    });
    KeyboardHandle.prototype.keyCodes = {
        enter: 13,
        shift: 16,
        ctrl: 17,
        escape: 27
    };
    // private methods
    KeyboardHandle.prototype.isKeyDown = function (keyChar) {
        return this.__keysDown.indexOf(keyChar) > -1 ? true : false;
    };
    KeyboardHandle.prototype.keydown = function (keyCode) {
        if (!String.fromCharCode(keyCode)) {
            return;
        }
        if (this.keyCodes.shift === keyCode) {
            this.__isShiftKeyDown = true;
        }
        if (this.keyCodes.ctrl === keyCode) {
            this.__isCtrlKeyDown = true;
        }
        this.__keysDown.push(String.fromCharCode(keyCode));
    };
    KeyboardHandle.prototype.keyup = function (keyCode) {
        if (!String.fromCharCode(keyCode)) {
            return;
        }
        var idx = this.__keysDown.indexOf(String.fromCharCode(keyCode));
        this.__keysDown.splice(idx);
        if (this.keyCodes.enter === keyCode) {
            this.enter();
        }
        if (this.keyCodes.shift === keyCode) {
            this.__isShiftKeyDown = false;
        }
        if (this.keyCodes.ctrl === keyCode) {
            this.__isCtrlKeyDown = false;
        }
        if (this.keyCodes.escape === keyCode) {
            this.escape();
        }
    };
    KeyboardHandle.prototype.keypress = function () { };
    KeyboardHandle.prototype.enter = function () { };
    KeyboardHandle.prototype.escape = function () { };

    return KeyboardHandle;
});