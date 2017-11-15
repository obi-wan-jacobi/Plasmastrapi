define(['data-handle', 'validator'],
function (DataHandle, validator) {

    PickHandle.prototype = Object.create(DataHandle.prototype);
    PickHandle.prototype.constructor = PickHandle;
    function PickHandle(fnPickAction) {
        fnPickAction = fnPickAction || function () { };
        DataHandle.call(this, fnPickAction);
        // private variables
        this.__fnPickAction = fnPickAction;
        this.__isPoked = false;
        this.__isProdded = false;
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
        'isProdded': {
            get: function () {
                return this.__isProdded;
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
        this.__isProdded = false;
        this.unhover();
        this.deselect();
    };
    PickHandle.prototype.poke = function () {
        if (this.__isHovered) {
            this.__isPoked = true;
        }
    };
    PickHandle.prototype.unpoke = function () {
        if (!this.__isHovered) {
            this.__isPoked = false;
        }
    };
    PickHandle.prototype.prod = function () {
        if (this.__isPoked) {
            this.__isPoked = false;
            this.__isProdded = true;
        }
    };
    PickHandle.prototype.pull = function (position) {
        if (this.__isProdded) {
            this.__isProdded = false;
        }
    };
    PickHandle.prototype.pet = function () {
        // TODO
    };
    PickHandle.prototype.pick = function () {
        if (this.__isHovered && this.__isProdded) {
            this.__isProdded = false;
            this.__fnPickAction();
        }
    };
    PickHandle.prototype.setPickAction = function (fnPickAction) {
        validator.validateFunction(this, fnPickAction);
        this.__fnPickAction = fnPickAction;
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
            this.pull();
        }
    };
    PickHandle.prototype.unhover = function () {
        if (this.__isHovered) {
            this.mouseleave();
        }
        this.__hoverPosition = null;
    };
    PickHandle.prototype.mouseleave = function () {
        this.__isHovered = false;
        this.__hoverPosition = null;
    };

    return PickHandle;
});