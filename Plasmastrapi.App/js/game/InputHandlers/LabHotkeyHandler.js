define(['input-handler'],
function (InputHandler) {

    LabHotkeyHandler.prototype = Object.create(InputHandler.prototype);
    LabHotkeyHandler.prototype.constructor = LabHotkeyHandler;
    function LabHotkeyHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
    };
    // private methods
    LabHotkeyHandler.prototype.__oninit = function () {
    };
    LabHotkeyHandler.prototype.__onload = function () {
        // Disable wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
    };
    LabHotkeyHandler.prototype.__onunload = function () {
        // Re-enable wires
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__wireContainer.forEach(enableElement);
    };
    // public methods
    LabHotkeyHandler.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    LabHotkeyHandler.prototype.keyup = function (keyboardHandle) {
        
    };
    LabHotkeyHandler.prototype.enter = function () {
    };
    LabHotkeyHandler.prototype.escape = function () {
    };
    LabHotkeyHandler.prototype.mousemove = function () {
    };
    LabHotkeyHandler.prototype.mousedown = function () {
    };
    LabHotkeyHandler.prototype.mouseup = function () {
    };
    LabHotkeyHandler.prototype.click = function () {
    };
    LabHotkeyHandler.prototype.dispose = function () {
        this.unload();
    };

    return LabHotkeyHandler;
});