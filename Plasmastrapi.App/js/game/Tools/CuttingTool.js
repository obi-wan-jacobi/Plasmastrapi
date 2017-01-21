define(["../Objects/Tool"], function (Tool) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool() {
        Tool.prototype.call(this, [/* works with */]);
        tool.mousedown = function () {
            // master tool does the picking
            var pickableComponent = entity.getComponent(Components.PickableComponent);
            pickableComponent.pick();
        };
    };

    return CuttingTool;
});