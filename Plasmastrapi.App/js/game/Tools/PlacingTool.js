define(function () {
    $.placingTool = (function () {
        var tool = new Tool();
        var equippedEntity, handlePosition;
        tool.pickableEntityClassesList = [UI.UIElement, Lab.CircuitDesignArea];
        tool.equip = function (entity) {
            if (!entity) {
                throw new Error('placingTool:equip - The entity to be placed must be defined.');
            }
            equippedEntity = entity;
            handlePosition = toolController.lastCursorPosition;
        };
        tool.mousemove = function (cursor) {
            var poseComponent = equippedEntity.getComponent(Components.PoseComponent)
            var position = poseComponent.position;
            poseComponent.position = new Geometry.Position(
				position.x + (cursor.x - handlePosition.x),
				position.y + (cursor.y - handlePosition.y)
			);
            handlePosition = cursor;
        };
        tool.mouseup = function () {
            var entity = resolveFirstPick(toolController.getPicks());
            if (entity instanceof UI.UIElement) {
                equippedEntity.destroy();
            }
            toolController.equip($.masterTool);
        };
        return tool;
    }());
});