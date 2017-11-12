define(['input-handler'],
function (InputHandler) {

    LabHotkeyHandler.prototype = Object.create(InputHandler.prototype);
    LabHotkeyHandler.prototype.constructor = LabHotkeyHandler;
    function LabHotkeyHandler(engine) {
        InputHandler.call(this, engine);
    };
    // private methods
    LabHotkeyHandler.prototype.__oninit = function () {
    };
    LabHotkeyHandler.prototype.__onload = function () {
    };
    LabHotkeyHandler.prototype.__onunload = function () {
    };
    // public methods
    LabHotkeyHandler.prototype.onkeydown = function (keyboardHandle) {
        this.__engine.getController('lab-controller').hotkey(keyboardHandle.getKeyString());
    };
    LabHotkeyHandler.prototype.onkeyup = function (keyboardHandle) {
        
    };
    LabHotkeyHandler.prototype.onenter = function () {
    };
    LabHotkeyHandler.prototype.onescape = function () {
    };
    LabHotkeyHandler.prototype.onmousemove = function () {
    };
    LabHotkeyHandler.prototype.onmousedown = function () {
    };
    LabHotkeyHandler.prototype.onmouseup = function () {
    };
    LabHotkeyHandler.prototype.onclick = function () {
    };
    LabHotkeyHandler.prototype.dispose = function () {
    };

    return LabHotkeyHandler;
});