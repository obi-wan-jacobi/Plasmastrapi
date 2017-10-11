define([
    // Base
    'tool',
    // Components
    'pick-component',
    'pose-component',
    // Data
    'position',
    // Configs
    'design-zone',
    'destruction-zone'
],
function (InputHandler, PickComponent, PoseComponent, Position, DesignZone, DestructionZone) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool() {
        InputHandler.call(this);
        this.__equippedEntity = null;
        this.__fnShiftKeyMouseUp = null;
        this.__previousCursorPosition = null;
    };
    PlacingTool.prototype.__onequip = function (entity, fnShiftKeyMouseUp, x, y) {
        this.__previousCursorPosition = new Position(x, y);
        this.__equippedEntity = entity;
        this.__fnShiftKeyMouseUp = fnShiftKeyMouseUp;
        this.setFilter(DestructionZone, DesignZone);
    };
    PlacingTool.prototype.__onmousemove = function (cursor) {
        var poseComponent = this.__equippedEntity.getComponent(PoseComponent)
        var position = poseComponent.position;
        poseComponent.position = new Position(
			position.x + (cursor.x - this.__previousCursorPosition.x),
			position.y + (cursor.y - this.__previousCursorPosition.y)
		);
        this.__previousCursorPosition = cursor;
    };
    PlacingTool.prototype.__onmouseup = function (cursor) {
        InputHandler.prototype.__onmouseup(cursor);
        this.__equippedEntity.getComponent(PickComponent).deselect();
        if (this.isShiftKeyDown && this.__fnShiftKeyMouseUp) {
            this.__fnShiftKeyMouseUp(cursor.x, cursor.y);
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };
    PlacingTool.prototype.__onkeyup = function (keyCode) {
        InputHandler.prototype.__onkeyup.call(this, keyCode);
        if (this.keyCodes.shift === keyCode && this.__fnShiftKeyMouseUp) {
            this.__equippedEntity.destroy();
            this.__engine.toolController.equipPickingTool();
        }
    };

    return PlacingTool;
});