define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Data/Geometry", "../Namespaces/$PickableTraits"], function (Tool, $, Geometry, $PickableTraits) {

    PlacingTool.prototype = Object.create(Tool.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool() {
        Tool.call(this);
        this.__equippedEntity = null;
        this.__previousCursorPosition = null
    };
    PlacingTool.prototype.__onequip = function (entity) {
        this.setPickableTraitListFilter(new $PickableTraits.PickableTraitList($PickableTraits.DestructionZone, $PickableTraits.DesignZone));
        this.__equippedEntity = entity;
        this.__previousCursorPosition = null;
    };
    PlacingTool.prototype.__onmousemove = function (cursor) {
        if (!this.__previousCursorPosition) {
            this.__previousCursorPosition = cursor;
            return;
        }
        var poseComponent = this.__equippedEntity.getComponent($.PoseComponent)
        var position = poseComponent.position;
        poseComponent.position = new Geometry.Position(
			position.x + (cursor.x - this.__previousCursorPosition.x),
			position.y + (cursor.y - this.__previousCursorPosition.y)
		);
        this.__previousCursorPosition = cursor;
    };
    PlacingTool.prototype.__onmouseup = function (cursor) {
        this.__equippedEntity.getComponent($.PickableComponent).deselect();
        this.__engine.toolController.equipPickingTool();
    };

    return PlacingTool;
});