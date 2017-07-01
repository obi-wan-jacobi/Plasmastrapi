define(['data-handle'],
function (Handle) {

    MouseHandle.prototype = Object.create(Handle.prototype);
    MouseHandle.prototype.constructor = MouseHandle;
    function MouseHandle() {
        Handle.call(this, new Position(), null, Position, null);
        // private variables
        this.__isMouseDown = false;
    };
    // public prototypal variables
    Object.defineProperties(MouseHandle.prototype, {
        'isMouseDown': {
            get: function () {
                return this.__isMouseDown;
            }
        }
    });
    // private methods
    MouseHandle.prototype.mousedown = function () {
        this.__isMouseDown = true;
    };
    MouseHandle.prototype.mouseup = function () {
        this.__isMouseDown = false;
    };
    MouseHandle.prototype.click = function () { };

    return MouseHandle;
});