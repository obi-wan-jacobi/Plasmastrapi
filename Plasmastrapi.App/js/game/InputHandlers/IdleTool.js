define(['input-handler'],
function (InputHandler) {

    IdleTool.prototype = Object.create(InputHandler.prototype);
    IdleTool.prototype.constructor = IdleTool;
    function IdleTool(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
    };
    // private methods
    IdleTool.prototype.__oninit = function () {
    };
    IdleTool.prototype.__onload = function () {
        // Disable wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
    };
    IdleTool.prototype.__onunload = function () {
        // Re-enable wires
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__wireContainer.forEach(enableElement);
    };
    // public methods
    IdleTool.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    IdleTool.prototype.keyup = function (keyboardHandle) { 
    };
    IdleTool.prototype.enter = function () {
    };
    IdleTool.prototype.escape = function () {
    };
    IdleTool.prototype.mousemove = function (position) {
        if (this.__selectionBox.isStarted) {
            this.__selectionBox.stretchTo(position);
        }
    };
    IdleTool.prototype.mousedown = function (position) {
        if (!this.__selectionBox.isStarted) {
            this.__selectionBox.startAt(position);
        }
    };
    IdleTool.prototype.mouseup = function () {
    };
    IdleTool.prototype.click = function () {
        this.__labController.idle();
    };
    IdleTool.prototype.dispose = function () {
        this.unload();
        this.__selectionBox.destroy();
        this.__selectionBox = null;
    };

    return IdleTool;
});