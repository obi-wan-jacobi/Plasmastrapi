define(['input-handler'],
function (InputHandler) {

    TrashTool.prototype = Object.create(InputHandler.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer= this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
    };
    // private methods
    TrashTool.prototype.__oninit = function () {
    };
    TrashTool.prototype.__onload = function () {
        // Disable everything except for logic elements
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    TrashTool.prototype.__onunload = function () {
        // Re-enable everything
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__wireContainer.forEach(enableElement);
        this.__inputTerminalContainer.forEach(enableElement);
        this.__outputTerminalContainer.forEach(enableElement);
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
    TrashTool.prototype.mousemove = function () {
    };
    TrashTool.prototype.mousedown = function () {
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
        this.__labController.setRepeatLastActionOff();
    };

    return TrashTool;
});