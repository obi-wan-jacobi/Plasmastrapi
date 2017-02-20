define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Data/Geometry", "../Namespaces/$PickableTraits"], function (Tool, $, Geometry, $PickableTraits) {

    PlacingTool.prototype = Object.create(Tool.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(entity, fnShiftKeyMouseUp) {
        Tool.call(this);
        this.__equippedEntity = entity;
        this.__fnShiftKeyMouseUp = fnShiftKeyMouseUp;
        this.__previousCursorPosition = null
    };
    PlacingTool.prototype.__onequip = function (x, y) {
        this.setPickableTraitListFilter(new $PickableTraits.PickableTraitList($PickableTraits.DestructionZone, $PickableTraits.DesignZone));
        this.__previousCursorPosition = new Geometry.Position(x, y);
    };
    PlacingTool.prototype.__onmousemove = function (cursor) {
        var poseComponent = this.__equippedEntity.getComponent($.PoseComponent)
        var position = poseComponent.position;
        poseComponent.position = new Geometry.Position(
			position.x + (cursor.x - this.__previousCursorPosition.x),
			position.y + (cursor.y - this.__previousCursorPosition.y)
		);
        this.__previousCursorPosition = cursor;
    };
    PlacingTool.prototype.__onmouseup = function (cursor) {
        Tool.prototype.__onmouseup(cursor);
        this.__equippedEntity.getComponent($.PickableComponent).deselect();
        if (this.isShiftKeyDown && this.__fnShiftKeyMouseUp) {
            this.__fnShiftKeyMouseUp();
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return PlacingTool;
});