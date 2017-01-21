define(["../Objects/Tool"], function (Tool) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool() {
        Tool.call(this, [/* works with */]);
    };

    return CuttingTool;
});