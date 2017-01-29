define(["../Objects/Tool", "../../engine/Components/$Components", "./Compatibility/$Compatibility"], function (Tool, $, $Compatibility) {

    PickingTool.prototype = Object.create(Tool.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        Tool.call(this);
    };
    PickingTool.prototype.__onequip = function () {
        this.filterByCompatibility($Compatibility.Selectable);
    };
    PickingTool.prototype.__pick_onmousedown = function (entities) {
        entities[0].getComponent($.PickableComponent).select();
    };

    return PickingTool;
});