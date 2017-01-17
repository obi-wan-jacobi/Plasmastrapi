define(function () {

    function MasterTool() {

        Tool.prototype.call(this, [/* works with */]);

        tool.mousedown = function () {
            // master tool does the picking
            var pickableComponent = entity.getComponent(Components.PickableComponent);
            pickableComponent.pick();
        };
    };
});