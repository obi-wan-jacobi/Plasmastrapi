define(['data-handle', 'validator'],
function (DataHandle, validator) {

    var defaultDragAction = function () { };

    PickHandle.prototype = Object.create(DataHandle.prototype);
    PickHandle.prototype.constructor = PickHandle;
    function PickHandle(fnPickAction) {
        fnPickAction = fnPickAction || function () { };
        DataHandle.call(this, fnPickAction);
        // private variables
        this.__fnDragAction = defaultDragAction;
        this.__isPoked = false;
        this.__isHovered = false;
        this.__isSelected = false;
        this.__hoverPosition = null;
    };
    PickHandle.prototype.setData = function (pickAction) {
        this.setPickAction(pickAction);
    };
    PickHandle.prototype.setDisplaySettings = function () { };
    // public prototypal variables
    Object.defineProperties(PickHandle.prototype, {
        'isPoked': {
            get: function () {
                return this.__isPoked;
            }
        },
        'isHovered': {
            get: function () {
                return this.__isHovered;
            }
        },
        'isSelected': {
            get: function () {
                return this.__isSelected;
            }
        },
        'hoverPosition': {
            get: function () {
                return this.__hoverPosition;
            }
        }
    });
    // public methods
    PickHandle.prototype.reset = function () {
        this.__isPoked = false;
        this.__isHovered = false;
        this.__isSelected = false;
        this.__hoverPosition = null;
    };
    PickHandle.prototype.poke = function () {
        this.__isPoked = true;
    };
    PickHandle.prototype.pick = function (position) {
        return this.__fnPickAction(position);
    };
    PickHandle.prototype.setPickAction = function (fnPickAction) {
        validator.validateFunction(fnPickAction);
        this.__fnPickAction = fnPickAction;
    };
    PickHandle.prototype.drag = function (position) {
        this.__isPoked = false;
        return this.__fnDragAction(position);
    };
    PickHandle.prototype.setDragAction = function (fnDragAction) {
        validator.validateFunction(fnDragAction);
        this.__fnDragAction = fnDragAction;
    };
    PickHandle.prototype.select = function () {
        this.__isSelected = true;
    };
    PickHandle.prototype.deselect = function () {
        this.__isSelected = false;
    };
    PickHandle.prototype.mouseenter = function () {
        this.__isHovered = true;
    };
    PickHandle.prototype.hover = function (position) {
        this.__hoverPosition = position;
        if (!this.__isHovered) {
            this.mouseenter();
        }
        if (this.__isPoked) {
            this.drag();
        }
    };
    PickHandle.prototype.unhover = function () {
        if (this.__isHovered) {
            this.mouseleave();
        }
    };
    PickHandle.prototype.mouseleave = function () {
        this.__isPoked = false;
        this.__isHovered = false;
        this.__hoverPosition = null;
    };

    return PickHandle;
});