define(['input-handler'],
function (InputHandler) {

    TrashTool.prototype = Object.create(InputHandler.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__selectionBox = null;
        this.__initSelectionBoxInitialized = true;
    };
    // private methods
    TrashTool.prototype.__oninit = function () {
    };
    TrashTool.prototype.__onload = function () {
        this.__enableLogicElements();
    };
    TrashTool.prototype.__onunload = function () {
        if (!this.__initSelectionBoxInitialized) {
            this.__disableLogicElements();
        }
    };
    TrashTool.prototype.__createSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'initSelectionBox', 'A selection box has already been initialized');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    TrashTool.prototype.__initSelectionBox = function () {
        this.__initSelectionBoxInitialized = true;
        this.__disableLogicElements();
    };
    TrashTool.prototype.__destroySelectionBox = function () {
        this.__selectionBox.destroy();
        this.__selectionBox = null;
        this.__initSelectionBoxInitialized = false;
    };
    TrashTool.prototype.__enableLogicElements = function () {
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
    };
    TrashTool.prototype.__disableLogicElements = function () {
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
    };
    // public methods
    TrashTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            this.__labController.hotkey(keyboardHandle.getKeyString());
        }
    };
    TrashTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    TrashTool.prototype.enter = function () {
    };
    TrashTool.prototype.escape = function () {
    };
    TrashTool.prototype.mousemove = function (position) {
        if (!this.__selectionBox) {
            return;
        } else {
            this.__selectionBox.stretchTo(position);
            if (!this.__initSelectionBoxInitialized && (this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)) {
                this.__initSelectionBox();
            }
        }
    };
    TrashTool.prototype.mousedown = function (position) {
        if (!this.__selectionBox) {
            this.__createSelectionBox(position);
        }
    };
    TrashTool.prototype.mouseup = function () {
        this.__labController.flushTarget();
    };
    TrashTool.prototype.click = function () {
        var target = this.__labController.flushTarget();
        if (target) {
            target.destroy();
        }
        this.__labController.idle();
    };
    TrashTool.prototype.dispose = function () {
        this.unload();
        if (this.__selectionBox) {
            this.__destroySelectionBox();
        }
        this.__labController.setRepeatLastActionOff();
    };

    return TrashTool;
});