define(["../Objects/Tool"], function (Tool) {

    NoTool.prototype = Object.create(Tool.prototype);
    NoTool.prototype.constructor = NoTool;
    function NoTool() {
        Tool.prototype.call(this, [/* works with */]);
        tool.mousedown = function () {
            // master tool does the picking
            var pickableComponent = entity.getComponent(Components.PickableComponent);
            pickableComponent.pick();
        };
    };

    return NoTool;
});