define(["../Objects/Tool", "../../engine/Components/$Components", "../../engine/Data/Geometry", "./Compatibility/$Compatibility", "../Circuits/$Circuits"],
function (Tool, $, Geometry, $Compatibility, $Circuits) {

    WireTool.prototype = Object.create(Tool.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool() {
        Tool.call(this);
        this.__selectedTerminal = null;
        this.__toolWire = null;
        this.__terminalHandle = null;
        this.__isSelectedTerminalAnInput = null;
    };
    WireTool.prototype.__onequip = function (terminal) {
        // filter pickable entities according to whether we're selecting an input or output terminal
        var compatibility;
        this.__selectedTerminal = terminal;
        var pickableComponent = this.__selectedTerminal.getComponent($.PickableComponent);
        if ($Compatibility.WireableAsInput.resolve(pickableComponent)) {
            compatibility = $Compatibility.WireableAsOutput
            this.__isSelectedTerminalAnInput = true;
        } else if ($Compatibility.WireableAsOutput.resolve(pickableComponent)) {
            compatibility = $Compatibility.WireableAsInput
            this.__isSelectedTerminalAnInput = false;
        } else {
            throw new Error(this.constructor.name + ":onequip - " + terminal.constructor.name + " is not compatible with this tool");
        }
        this.filterByCompatibility(compatibility);
        // select terminal
        pickableComponent.select();
    };
    WireTool.prototype.__ondiscard = function () {
        // deselect terminal
        var pickableComponent = this.__selectedTerminal.getComponent($.PickableComponent);
        pickableComponent.deselect();
        // clean up the entity space
        this.__terminalHandle.destroy();
        this.__toolWire.destroy();
        this.__terminalHandle = null;
        this.__toolWire = null;
    };
    WireTool.prototype.__input_onmousemove = function (cursor) {
        if (!this.__terminalHandle) {
            // draw a wire from the selected terminal to the cursor
            this.__terminalHandle = new $Circuits.TerminalHandle(cursor.x, cursor.y);
            if (this.__isSelectedTerminalAnInput) {
                this.__toolWire = new $Circuits.ToolWire(this.__terminalHandle, this.__selectedTerminal);
            } else {
                this.__toolWire = new $Circuits.ToolWire(this.__selectedTerminal, this.__terminalHandle);
            }
            this.__engine.sceneController.addToCurrentScene(this.__terminalHandle);
            this.__engine.sceneController.addToCurrentScene(this.__toolWire);
        }
        else {
            // move tool handle
            var poseComponent = this.__terminalHandle.getComponent($.PoseComponent)
            poseComponent.position = new Geometry.Position(
                cursor.x,
                cursor.y
            );
        }
    };
    WireTool.prototype.__pick_onmouseup = function (entities) {
        // replace the tool wire with a real wire
        var wire, terminal = entities[0];
        if (this.__isSelectedTerminalAnInput) {
            wire = new $Circuits.Wire(terminal, this.__selectedTerminal);
        } else {
            wire = new $Circuits.Wire(this.__selectedTerminal, terminal);
        }
        this.__engine.sceneController.addToCurrentScene(wire);
        this.__engine.toolController.equipPickingTool();
    };

    return WireTool;
});