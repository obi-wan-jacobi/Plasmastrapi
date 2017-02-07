define(["./Base/Tool"], function (Tool) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool(x, y) {
        Tool.call(this, x, y);
    };

    return CuttingTool;
});