define(['input-handler'],
function (InputHandler) {

    LabHotkeyHandler.prototype = Object.create(InputHandler.prototype);
    LabHotkeyHandler.prototype.constructor = LabHotkeyHandler;
    function LabHotkeyHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = null;
    };
    // private methods
    LabHotkeyHandler.prototype.__oninit = function () {
        this.__labController = this.__engine.getController('lab-controller');
    };
    LabHotkeyHandler.prototype.__onload = function () {
    };
    LabHotkeyHandler.prototype.__onunload = function () {
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
    };

    return LabHotkeyHandler;
});