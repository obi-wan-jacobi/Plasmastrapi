define(['tool-handler'],
function (ToolHandler) {

    NoTool.prototype = Object.create(ToolHandler.prototype);
    NoTool.prototype.constructor = NoTool;
    function NoTool(engine) {
        ToolHandler.call(this, engine);
    };
    // private methods
    NoTool.prototype.__oninit = function () {
    };
    NoTool.prototype.__onload = function () {
    };
    NoTool.prototype.__onunload = function () {
    };
    // public methods
    NoTool.prototype.keydown = function (keyboardHandle) {
        ToolHandler.prototype.keydown.call(this, keyboardHandle);
    };
    NoTool.prototype.keyup = function (keyboardHandle) {
    };
    NoTool.prototype.enter = function () {
    };
    NoTool.prototype.escape = function () {
    };
    NoTool.prototype.mousemove = function (position) {
    };
    NoTool.prototype.mousedown = function (position) {
    };
    NoTool.prototype.mouseup = function () {
    };
    NoTool.prototype.click = function () {
    };
    NoTool.prototype.dispose = function () {
        this.unload();
    };

    return NoTool;
});