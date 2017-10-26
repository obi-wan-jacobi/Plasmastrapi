define(['data-handle', 'validator'],
function (DataHandle, validator) {

    PickHandle.prototype = Object.create(DataHandle.prototype);
    PickHandle.prototype.constructor = PickHandle;
    function PickHandle(fnPickAction) {
        fnPickAction = fnPickAction || function () { };
        DataHandle.call(this, fnPickAction);
        // private variables
        this.__isHovered = false;
        this.__isSelected = false;
    };
    PickHandle.prototype.setData = function (pickAction) {
        this.setPickAction(pickAction);
    };
    PickHandle.prototype.setDisplaySettings = function () { };
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
    PickHandle.prototype.setPickAction = function (fnPickAction) {
        validator.validateFunction(fnPickAction);
        this.__fnPickAction = fnPickAction;
    };
    PickHandle.prototype.pick = function () {
        return this.__fnPickAction();
    };
    PickHandle.prototype.hover = function () {
        if (!this.__isHovered) {
            this.mouseenter();
        }
    };
    PickHandle.prototype.unhover = function () {
        if (this.__isHovered) {
            this.mouseleave();
        }
    };
    PickHandle.prototype.mouseenter = function () {
        this.__isHovered = true;
    };
    PickHandle.prototype.mouseleave = function () {
        this.__isHovered = false;
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

    return PickHandle;
});