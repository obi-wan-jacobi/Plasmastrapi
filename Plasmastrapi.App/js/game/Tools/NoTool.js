define(["./Base/Tool"], function (Tool) {

    NoTool.prototype = Object.create(Tool.prototype);
    NoTool.prototype.constructor = NoTool;
    function NoTool(x, y) {
        Tool.call(this, x, y);
    };

    return NoTool;
});