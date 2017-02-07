define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Data/Geometry", "../Namespaces/$PickableTraits", "../Namespaces/$Circuits"],
function (Tool, $, Geometry, $PickableTraits, $Circuits) {

    WireTool.prototype = Object.create(Tool.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool(x, y) {
        Tool.call(this, x, y);
        this.__selectedTerminal = null;
        this.__toolWire = null;
        this.__terminalHandle = null;
        this.__isSelectedTerminalAnInput = null;
    };
    WireTool.prototype.__onequip = function (terminal) {
        // filter pickable entities according to whether we're selecting an input or output terminal
        var terminalCompatibility;
        this.__selectedTerminal = terminal;
        var pickableComponent = this.__selectedTerminal.getComponent($.PickableComponent);
        if ($PickableTraits.WireableAsInput.resolve(pickableComponent)) {
            terminalCompatibility = $PickableTraits.WireableAsOutput
            this.__isSelectedTerminalAnInput = true;
        } else if ($PickableTraits.WireableAsOutput.resolve(pickableComponent)) {
            terminalCompatibility = $PickableTraits.WireableAsInput
            this.__isSelectedTerminalAnInput = false;
        } else {
            throw new Error(this.constructor.name + ":onequip - " + terminal.constructor.name + " is not compatible with this tool");
        }
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList(terminalCompatibility, $PickableTraits.DestructionZone, $PickableTraits.DesignZone)
        );
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
    WireTool.prototype.__onmousemove = function (cursor) {
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
        var wire, terminal = null;
        // get first terminal
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.WireableAsInput.resolve(pickableComponent) || $PickableTraits.WireableAsOutput.resolve(pickableComponent)) {
                // replace the tool wire with a real wire
                terminal = entities[i];
                if (this.__isSelectedTerminalAnInput) {
                    wire = new $Circuits.Wire(terminal, this.__selectedTerminal);
                } else {
                    wire = new $Circuits.Wire(this.__selectedTerminal, terminal);
                }
                this.__engine.sceneController.addToCurrentScene(wire);
                break;
            }
        }
        this.__engine.toolController.equipPickingTool();
    };

    return WireTool;
});