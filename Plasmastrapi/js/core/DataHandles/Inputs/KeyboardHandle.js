define(['handle'],
function (Handle) {

    KeyboardHandle.prototype = Object.create(Handle.prototype);
    KeyboardHandle.prototype.constructor = KeyboardHandle;
    function KeyboardHandle() {
        Handle.call(this);
        // private variables
        this.__keysDown = [];
        this.__keyMapper = new Dictionary('number');
        this.__keyMapper.add(13, 'enter');
        this.__keyMapper.add(16, 'shift');
        this.__keyMapper.add(17, 'ctrl');
        this.__keyMapper.add(27, 'escape');
    };
    // public prototypal variables
    Object.defineProperties(KeyboardHandle.prototype, {
        'isShiftKeyDown': {
            get: function () {
                return this.isKeyDown('shift');
            }
        },
        'isCtrlKeyDown': {
            get: function () {
                return this.isKeyDown('ctrl');
            }
        }
    });
    // private methods
    KeyboardHandle.prototype.isKeyDown = function (keyChar) {
        return this.__keysDown.indexOf(keyChar) > -1 ? true : false;
    };
    KeyboardHandle.prototype.keydown = function (keyCode) {
        var stringFromKeyCode = String.fromCharCode(keyCode);
        if (!stringFromKeyCode) {
            return;
        }
        var keyString = this.__keyMapper.get(keyCode);
        if (keyString) {
            this.__keysDown.push(keyString);
            return keyString;
        } else {
            this.__keysDown.push(stringFromKeyCode);
            return stringFromKeyCode;
        }
    };
    KeyboardHandle.prototype.keyup = function (keyCode) {
        if (!String.fromCharCode(keyCode)) {
            return;
        }
        var idx = this.__keysDown.indexOf(String.fromCharCode(keyCode));
        return this.__keysDown.splice(idx);
    };

    return KeyboardHandle;
});