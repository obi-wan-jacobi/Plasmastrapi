define(["../Objects/Tool", "../../engine/Components/$Components", "../../engine/Data/Geometry", "../UI/Traits/$Traits"], function (Tool, $, Geometry, $Traits) {

    PlacingTool.prototype = Object.create(Tool.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool() {
        Tool.call(this);
        this.__equippedEntity = null;
    };
    PlacingTool.prototype.__onequip = function (entity) {
        this.filterByCompatibility($Traits.DesignZone);
        this.__equippedEntity = entity;
    };
    PlacingTool.prototype.__input_onmousemove = function (cursor) {
        var poseComponent = this.__equippedEntity.getComponent($.PoseComponent)
        var position = poseComponent.position;
        poseComponent.position = new Geometry.Position(
			cursor.x,
			cursor.y
		);
    };
    PlacingTool.prototype.__input_onmouseup = function (cursor) {
        this.__equippedEntity.getComponent($.PickableComponent).deselect();
        this.__engine.toolController.equipPickingTool();
    };

    return PlacingTool;
});