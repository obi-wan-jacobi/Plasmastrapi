define(['data-handle', 'validator'],
function (DataHandle, validator) {

    PickHandle.prototype = Object.create(DataHandle.prototype);
    PickHandle.prototype.constructor = PickHandle;
    function PickHandle(pickAction) {
        DataHandle.call(this);
        // private variables
        this.__pickAction = pickAction;
        this.__isHovered = false;
        this.__isSelected = false;
        // initialize
        this.setPickAction(pickAction);
    };
    PickHandle.prototype.setData = function (pickAction) { };
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
    PickHandle.prototype.setPickAction = function (pickAction) {
        validator.validateFunction(pickAction);
        this.__pickAction = pickAction;
    };
    PickHandle.prototype.pick = function () {
        return this.__pickAction();
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

    return PickHandle;
});