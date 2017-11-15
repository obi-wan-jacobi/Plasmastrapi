define(['input-handler'],
function (InputHandler) {

    TrashTool.prototype = Object.create(InputHandler.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool(engine) {
        InputHandler.call(this, engine);
    };
    // private methods
    TrashTool.prototype.__oninit = function () {
    };
    TrashTool.prototype.__onload = function () {
    };
    TrashTool.prototype.__onunload = function () {
    };
    // public methods
    TrashTool.prototype.keydown = function () {
    };
    TrashTool.prototype.keyup = function () {
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
    };
    TrashTool.prototype.click = function () {
    };
    TrashTool.prototype.dispose = function () {
    };

    return TrashTool;
});