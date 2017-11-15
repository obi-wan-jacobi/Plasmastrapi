define(['input-handler'],
function (InputHandler) {

    WireCutterTool.prototype = Object.create(InputHandler.prototype);
    WireCutterTool.prototype.constructor = WireCutterTool;
    function WireCutterTool(engine) {
        InputHandler.call(this, engine);
    };
    // private methods
    WireCutterTool.prototype.__oninit = function () {
    };
    WireCutterTool.prototype.__onload = function () {
    };
    WireCutterTool.prototype.__onunload = function () {
    };
    // public methods
    WireCutterTool.prototype.keydown = function () {
    };
    WireCutterTool.prototype.keyup = function () {
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
    };
    WireCutterTool.prototype.dispose = function () {
    };

    return WireCutterTool;
});