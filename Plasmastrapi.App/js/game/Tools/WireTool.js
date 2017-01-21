define(["../Objects/Tool"], function (Tool) {

    WireTool.prototype = Object.create(Tool.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool() {
        var tool = new Tool();
        var toolHandle, intermediateWire, equippedTerminal;
        tool.pickableEntityClassesList = [Lab.Terminal];
        tool.equip = function (terminal) {
            if (!(terminal instanceof Lab.InputTerminal) && !(terminal instanceof Lab.OutputTerminal)) {
                throw new Error('wireTool:equip - ' + terminal + ' must be an instance of Lab.Terminal.');
            }
            equippedTerminal = terminal;
            if (terminal instanceof Lab.InputTerminal) {
                tool.pickableEntityClassesList = [Lab.OutputTerminal];
            }
            if (terminal instanceof Lab.OutputTerminal) {
                tool.pickableEntityClassesList = [Lab.InputTerminal];
            }
            // filter pickableEntityClasses for compatible terminals only
            toolController.reequip();
            // create wire between terminal and toolHandle
            var position = toolController.lastCursorPosition;
            toolHandle = new Lab.ToolHandle(position.x, position.y);
            intermediateWire = new Lab.Wire(terminal, toolHandle);
            // select the terminal
            var pickableComponent = equippedTerminal.getComponent(Components.PickableComponent);
            pickableComponent.select();
        };
        tool.discard = function () {
            // deselect terminal
            var pickableComponent = equippedTerminal.getComponent(Components.PickableComponent);
            pickableComponent.deselect();
            // reset pickableEntityClasses to default compatibility
            tool.pickableEntityClassesList = [Lab.Terminal];
            // clean up the scene's entity space
            toolHandle.destroy();
            intermediateWire.destroy();
        };
        tool.mousemove = function (cursor) {
            var poseComponent = toolHandle.getComponent(Components.PoseComponent)
            poseComponent.position = new Geometry.Position(
				cursor.x,
				cursor.y
			);
        };
        tool.mouseup = function () {
            var entity = resolveFirstPick(toolController.getPicks());
            if (entity instanceof Lab.InputTerminal) {
                var wire = new Lab.Wire(equippedTerminal, entity);
            }
            if (entity instanceof Lab.OutputTerminal) {
                var wire = new Lab.Wire(entity, equippedTerminal);
            }
            toolController.equip($.masterTool);
        };
        return tool;
    };

    return WireTool;
});