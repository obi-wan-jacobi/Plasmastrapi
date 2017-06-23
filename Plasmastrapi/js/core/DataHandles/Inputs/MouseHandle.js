define(['handle'],
function (Handle) {

    MouseHandle.prototype = Object.create(Handle.prototype);
    MouseHandle.prototype.constructor = MouseHandle;
    function MouseHandle(position) {
        Handle.call(this, position, null, Position, null);
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
    MouseComponent.prototype.click = function () { };

    return MouseHandle;
});