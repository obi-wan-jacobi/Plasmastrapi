define(['tool-handler'],
function (ToolHandler) {

    IdleHandler.prototype = Object.create(ToolHandler.prototype);
    IdleHandler.prototype.constructor = IdleHandler;
    function IdleHandler(engine) {
        ToolHandler.call(this, engine);
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
        ToolHandler.prototype.keydown.call(this, keyboardHandle);
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