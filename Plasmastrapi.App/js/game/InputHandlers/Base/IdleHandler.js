define(['input-handler'],
function (InputHandler) {

    IdleHandler.prototype = Object.create(InputHandler.prototype);
    IdleHandler.prototype.constructor = IdleHandler;
    function IdleHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
    };
    // private methods
    IdleHandler.prototype.__oninit = function () {
    };
    IdleHandler.prototype.__onload = function () {
    };
    IdleHandler.prototype.__onunload = function () {
    };
    // public methods
    IdleHandler.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    IdleHandler.prototype.keyup = function (keyboardHandle) {
    };
    IdleHandler.prototype.enter = function () {
    };
    IdleHandler.prototype.escape = function () {
    };
    IdleHandler.prototype.mousemove = function (position) {
    };
    IdleHandler.prototype.mousedown = function (position) {
    };
    IdleHandler.prototype.mouseup = function () {
    };
    IdleHandler.prototype.click = function () {
    };
    IdleHandler.prototype.dispose = function () {
        this.unload();
    };

    return IdleHandler;
});