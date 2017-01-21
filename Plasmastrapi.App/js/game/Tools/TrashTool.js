define(["../Objects/Tool"], function (Tool) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool() {
        Tool.prototype.call(this, [/* works with */]);
        tool.mousedown = function () {
            // master tool does the picking
            var pickableComponent = entity.getComponent(Components.PickableComponent);
            pickableComponent.pick();
        };
    };

    return TrashTool;
});