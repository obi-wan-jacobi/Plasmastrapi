define(['input-handler'],
function (InputHandler) {

    SelectHandler.prototype = Object.create(InputHandler.prototype);
    SelectHandler.prototype.constructor = SelectHandler;
    function SelectHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__selectionBox = null;
    };
    // private methods
    SelectHandler.prototype.__oninit = function () {
    };
    SelectHandler.prototype.__onload = function () {
        // Disable wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
    };
    SelectHandler.prototype.__onunload = function () {
        // Re-enable wires
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__wireContainer.forEach(enableElement);
    };
    // public methods
    SelectHandler.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    SelectHandler.prototype.keyup = function (keyboardHandle) { 
    };
    SelectHandler.prototype.enter = function () {
    };
    SelectHandler.prototype.escape = function () {
    };
    SelectHandler.prototype.mousemove = function (position) {
        if (this.__selectionBox) {
            this.__selectionBox.stretchTo(position);
        }
    };
    SelectHandler.prototype.mousedown = function (position) {
        if (!this.__selectionBox) {
            this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
            this.__selectionBox.startAt(position);
        }
    };
    SelectHandler.prototype.mouseup = function () {
    };
    SelectHandler.prototype.click = function () {
        this.__selectionBox.destroy();
        this.__selectionBox = null;
    };
    SelectHandler.prototype.dispose = function () {
        this.unload();
    };

    return SelectHandler;
});