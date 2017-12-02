define(['controller', 'utils'],
function (Controller, utils) {

    LabController.prototype = Object.create(Controller.prototype);
    LabController.prototype.constructor = LabController;
    function LabController(engine) {
        Controller.call(this, engine);
        this.__inputController = null;
        this.__designArea = null;
        this.__designAreaPickComponent = null;
        this.__state = null;
        this.__target = null;
        this.__hotkeys = {};
        this.__isRepeatLastActionOn = false;
        this.__activeSelection = null;
    };
    // private methods
    LabController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__inputController = this.__engine.getController('input-controller');
    };
    LabController.prototype.__initDesignArea = function (panel) {
        this.__designArea = panel;
        this.__designAreaPickComponent = this.__designArea.getOrInitComponent('pick-component');
        this.__designAreaPickComponent.addEventListener('onmouseenter', this, this.__activate);
        this.__designAreaPickComponent.addEventListener('onmouseleave', this, this.__deactivate);
    };
    LabController.prototype.__activate = function () {
        if (!this.__state) {
            return this.__deactivate();
        }
        this[`__${this.__state}`](this.__target);
    }
    LabController.prototype.__deactivate = function () {
        this.__state = 'idle';
        this.__target = null;
        this.__activate();
    }
    LabController.prototype.__set = function (state, target) {
        this.__state = state;
        this.__target = target;
        if (this.__designAreaPickComponent.isHovered) {
            this.__activate();
        }
    };
    LabController.prototype.__idle = function () {
        if (this.__activeSelection) {
            this.__activeSelection.deselect();
            this.__activeSelection = null;
        }
        if (this.__designAreaPickComponent.isHovered) {
            this.__inputController.setHandler('selection-tool');
        } else {
            this.__inputController.setHandler('idle-handler');
        }
    };
    LabController.prototype.__place = function (logicElement) {
        this.__inputController.setHandler('placing-tool', [logicElement]);
    };
    LabController.prototype.__spawn = function (logicElementString) {
        this.__inputController.setHandler('spawning-tool', [logicElementString]);
    };
    LabController.prototype.__wire = function (terminal) {
        this.__target = null;
        this.__inputController.setHandler('wire-tool', [terminal]);
    };
    LabController.prototype.__trash = function () {
        this.__inputController.setHandler('trash-tool');
    };
    LabController.prototype.__cut = function () {
        this.__inputController.setHandler('wire-cutter-tool');
    };
    // public methods
    LabController.prototype.setSpawnerButton = function (button, typeString, hotkey) {
        var self = this;
        this.__hotkeys[hotkey] = function () {
            self.spawn(typeString);
            self.__activeSelection = button.getComponent('pick-component');
            self.__activeSelection.select();
        };
        button.set('pick-component:onpick', [this.__hotkeys[hotkey]]);
    };
    LabController.prototype.setTrashButton = function (button, hotkey) {
        var self = this;
        this.__hotkeys[hotkey] = function () {
            self.trash();
            self.__activeSelection = button.getComponent('pick-component');
            self.__activeSelection.select();
        };
        button.set('pick-component:onpick', [this.__hotkeys[hotkey]]);
    };
    LabController.prototype.setWireCutterButton = function (button, hotkey) {
        var self = this;
        this.__hotkeys[hotkey] = function () {
            self.cut();
            self.__activeSelection = button.getComponent('pick-component');
            self.__activeSelection.select();
        };
        button.set('pick-component:onpick', [this.__hotkeys[hotkey]]);
    };
    LabController.prototype.setDesignArea = function (panel) {
        if (this.__designArea) {
            utils.validator.throw(this, 'setDesignArea', 'A design area element has already been set');
        }
        utils.validator.validateInstanceType(this, panel, 'panel');
        this.__initDesignArea(panel);
    };
    LabController.prototype.getDesignArea = function () {
        return this.__designArea;
    };
    LabController.prototype.setTarget = function (target) {
        if (this.__state === 'idle') {
            if (utils.validator.isInstanceOfType(target, 'logic-element')) {
                this.place(target);
            }
            if (utils.validator.isInstanceOfType(target, 'selection-box')) {
                this.placeSelectionBox(target);
            }
            if (utils.validator.isInstanceOfType(target, 'terminal')) {
                this.wire(target);
            }
        } else {
            this.storeTarget(target);
        }
    };
    LabController.prototype.storeTarget = function (target) {
        this.__target = target;
    };
    LabController.prototype.flushTarget = function () {
        var target = this.__target;
        this.__target = null;
        return target;
    };
    LabController.prototype.idle = function () {
        if (this.__isRepeatLastActionOn) {
            this.__activate();
            return;
        }
        this.__set('idle', null);
    };
    LabController.prototype.place = function (logicElement) {
        utils.validator.validateInstanceType(this, logicElement, 'logic-element')
        this.__set('place', logicElement);
    };
    LabController.prototype.placeSelectionBox = function (selectionBox) {
        utils.validator.validateInstanceType(this, selectionBox, 'selection-box')
        this.__set('place', selectionBox);
    };
    LabController.prototype.spawn = function (logicElementString) {
        utils.validator.validateClassType(this, logicElementString, 'logic-element');
        this.__set('spawn', logicElementString);
    };
    LabController.prototype.wire = function (terminal) {
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        this.__set('wire', terminal);
    };
    LabController.prototype.trash = function () {
        this.__set('trash', null);
    };
    LabController.prototype.cut = function () {
        this.__set('cut', null);
    };
    LabController.prototype.setRepeatLastActionOn = function () {
        this.__isRepeatLastActionOn = true;
    }
    LabController.prototype.setRepeatLastActionOff = function () {
        this.__isRepeatLastActionOn = false;
    }
    LabController.prototype.hotkey = function (key) {
        if (this.__hotkeys[key]) {
            this.__hotkeys[key]();
        }
    };

    return LabController;
});