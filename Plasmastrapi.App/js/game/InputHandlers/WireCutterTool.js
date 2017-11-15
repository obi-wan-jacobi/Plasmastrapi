define(['input-handler'],
function (InputHandler) {

    WireCutterTool.prototype = Object.create(InputHandler.prototype);
    WireCutterTool.prototype.constructor = WireCutterTool;
    function WireCutterTool(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
    };
    // private methods
    WireCutterTool.prototype.__oninit = function () {
    };
    WireCutterTool.prototype.__onload = function () {
        // Disable everything except for wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    WireCutterTool.prototype.__onunload = function () {
        // Re-enable everything
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
        this.__inputTerminalContainer.forEach(enableElement);
        this.__outputTerminalContainer.forEach(enableElement);
    };
    // public methods
    WireCutterTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            this.__labController.hotkey(keyboardHandle.getKeyString());
        }
    };
    WireCutterTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    WireCutterTool.prototype.enter = function () {
    };
    WireCutterTool.prototype.escape = function () {
    };
    WireCutterTool.prototype.mousemove = function () {
    };
    WireCutterTool.prototype.mousedown = function () {
    };
    WireCutterTool.prototype.mouseup = function () {
    };
    WireCutterTool.prototype.click = function () {
        var target = this.__labController.flushTarget();
        if (target) {
            target.destroy();
        }
        this.__labController.idle();
    };
    WireCutterTool.prototype.dispose = function () {
        this.unload();
        this.__labController.setRepeatLastActionOff();
    };

    return WireCutterTool;
});