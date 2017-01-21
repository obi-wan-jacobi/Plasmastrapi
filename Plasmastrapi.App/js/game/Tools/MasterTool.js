﻿define(["../Objects/Tool"], function (Tool) {

    MasterTool.prototype = Object.create(Tool.prototype);
    MasterTool.prototype.constructor = MasterTool;
    function MasterTool() {
        Tool.prototype.call(this, [/* works with */]);
        tool.mousedown = function () {
            // master tool does the picking
            var pickableComponent = entity.getComponent(Components.PickableComponent);
            pickableComponent.pick();
        };
    };

    return MasterTool;
});