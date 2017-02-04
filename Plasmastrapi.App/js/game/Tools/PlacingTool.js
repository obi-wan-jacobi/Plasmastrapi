define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Data/Geometry", "../UI/Traits/$Traits"], function (Tool, $, Geometry, $Traits) {

    PlacingTool.prototype = Object.create(Tool.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool() {
        Tool.call(this);
        this.__equippedEntity = null;
        this.__previousCursorPosition = null
    };
    PlacingTool.prototype.__onequip = function (entity) {
        this.filterByTraits(new $Traits.TraitList($Traits.DestructionZone, $Traits.DesignZone));
        this.__equippedEntity = entity;
        this.__previousCursorPosition = null;
    };
    PlacingTool.prototype.__input_onmousemove = function (cursor) {
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
    PlacingTool.prototype.__input_onmouseup = function (cursor) {
        this.__equippedEntity.getComponent($.PickableComponent).deselect();
        this.__engine.toolController.equipPickingTool();
    };

    return PlacingTool;
});