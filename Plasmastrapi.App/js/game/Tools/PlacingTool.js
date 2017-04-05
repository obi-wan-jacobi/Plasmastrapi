define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Data/Geometry", "../Namespaces/$Compatibility"], function (Tool, $, Geometry, $Compatibility) {

    PlacingTool.prototype = Object.create(Tool.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool() {
        Tool.call(this);
        this.__equippedEntity = null;
        this.__fnShiftKeyMouseUp = null;
        this.__previousCursorPosition = null;
    };
    PlacingTool.prototype.__onequip = function (entity, fnShiftKeyMouseUp, x, y) {
        this.__previousCursorPosition = new Geometry.Position(x, y);
        this.__equippedEntity = entity;
        this.__fnShiftKeyMouseUp = fnShiftKeyMouseUp;
        this.setCompatibilityFilter(new $Compatibility.Filter($Compatibility.DestructionZone, $Compatibility.DesignZone));
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
            this.__fnShiftKeyMouseUp(cursor.x, cursor.y);
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };
    PlacingTool.prototype.__onkeyup = function (keyCode) {
        Tool.prototype.__onkeyup.call(this, keyCode);
        if (this.keyCodes.shift === keyCode && this.__fnShiftKeyMouseUp) {
            this.__equippedEntity.destroy();
            this.__engine.toolController.equipPickingTool();
        }
    };

    return PlacingTool;
});