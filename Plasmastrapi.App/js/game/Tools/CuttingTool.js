define(["./Base/Tool"], function (Tool) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool() {
        Tool.call(this);
    };

    return CuttingTool;
});