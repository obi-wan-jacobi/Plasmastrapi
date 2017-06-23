define(['handle'],
function (Handle) {

    PickHandle.prototype = Object.create(Handle.prototype);
    PickHandle.prototype.constructor = PickHandle;
    function PickHandle(callback) {
        Handle.call(this, callback, null, 'function', null);
        // private variables
        this.__isHovered = false;
        this.__isSelected = false;
    };
    // public prototypal variables
    Object.defineProperties(PickHandle.prototype, {
        'isHovered': {
            get: function () {
                return this.__isHovered;
            }
        },
        'isSelected': {
            get: function () {
                return this.__isSelected;
            }
        }
    });
    // public methods
    PickHandle.prototype.pick = function () {
        return this.__data();
    };
    PickHandle.prototype.select = function () {
        if (this.__isSelected) {
            return;
        }
        this.__isSelected = true;
    };
    PickHandle.prototype.deselect = function () {
        if (!this.__isSelected) {
            return;
        }
        this.__isSelected = false;
    };
    PickHandle.prototype.hover = function () {
        if (!this.__isHovered) {
            this.mouseenter();
        }
        this.__isHovered = true;
    };
    PickHandle.prototype.unhover = function () {
        if (this.__isHovered) {
            this.mouseleave();
        }
        this.__isHovered = false;
    };
    PickHandle.prototype.mouseenter = function () { };
    PickHandle.prototype.mouseleave = function () { };

    return PickHandle;
});