define([
    // Base
    'tool',
    // Circuits
    'terminal-handle',
    'tool-wire',
    'wire',
    // Components
    'pick-component',
    'pose-component',
    // Data
    'position',
    // Configs
    'design-zone',
    'destruction-zone',
    'wireable-as-input',
    'wireable-as-output',
],
function (Tool, TerminalHandle, ToolWire, Wire, PickComponent, PoseComponent, Position, DesignZone, DestructionZone, WireableAsInput, WireableAsOutput) {

    WireTool.prototype = Object.create(Tool.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool() {
        Tool.call(this);
        this.__selectedTerminal = null;
        this.__toolWire = null;
        this.__terminalHandle = null;
        this.__isSelectedTerminalAnInput = null;
    };
    WireTool.prototype.__setCompatibilityFilterRelativeTo = function (terminal) {
        this.__isSelectedTerminalAnInput = null;
        // filter pickable entities according to whether we're selecting an input or output terminal
        var terminalCompatibility;
        if (WireableAsInput.resolve(terminal)) {
            terminalCompatibility = WireableAsOutput
            this.__isSelectedTerminalAnInput = true;
        } else if (WireableAsOutput.resolve(terminal)) {
            terminalCompatibility = WireableAsInput
            this.__isSelectedTerminalAnInput = false;
        } else {
            throw new Error(this.constructor.name + ":onequip - " + this.__selectedTerminal.constructor.name + " is not compatible with this tool");
        }
        this.setCompatibilityFilter(terminalCompatibility, DestructionZone, DesignZone);
    };
    WireTool.prototype.__onequip = function (terminal) {
        this.__selectedTerminal = terminal;
        this.__setCompatibilityFilterRelativeTo(this.__selectedTerminal);
        // select terminal
        var pickComponent = this.__selectedTerminal.getComponent(PickComponent);
        pickComponent.select();
    };
    WireTool.prototype.__ondiscard = function () {
        // deselect terminal
        var pickComponent = this.__selectedTerminal.getComponent(PickComponent);
        pickComponent.deselect();
        this.__terminalHandle.destroy();
        this.__terminalHandle = null;
        this.__toolWire.destroy();
        this.__terminalHandle = null;
    };
    WireTool.prototype.__onmousemove = function (cursor) {
        if (!this.__terminalHandle) {
            // draw a wire from the selected terminal to the cursor
            this.__terminalHandle = new TerminalHandle(cursor.x, cursor.y);
            if (this.__isSelectedTerminalAnInput) {
                this.__toolWire = new ToolWire(this.__terminalHandle, this.__selectedTerminal);
            } else {
                this.__toolWire = new ToolWire(this.__selectedTerminal, this.__terminalHandle);
            }
            this.__engine.sceneController.addToCurrentScene(this.__terminalHandle);
            this.__engine.sceneController.addToCurrentScene(this.__toolWire);
        }
        else {
            // move tool handle
            var poseComponent = this.__terminalHandle.getComponent(PoseComponent)
            poseComponent.position = new Position(
                cursor.x,
                cursor.y
            );
        }
    };
    WireTool.prototype.__pick_onmouseup = function (entities) {
        var wire, terminal = null;
        // get first terminal
        for (var i = 0, L = entities.length; i < L; i++) {
            var entity = entities[i];
            if (WireableAsInput.resolve(entity) || WireableAsOutput.resolve(entity)) {
                // replace the tool wire with a real wire
                terminal = entity;
                if (this.__isSelectedTerminalAnInput) {
                    wire = new Wire(terminal, this.__selectedTerminal);
                } else {
                    wire = new Wire(this.__selectedTerminal, terminal);
                }
                this.__engine.sceneController.addToCurrentScene(wire);
                break;
            }
        }
        if (this.isShiftKeyDown) {
            this.__setCompatibilityFilterRelativeTo(this.__selectedTerminal);
            return;
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };
    WireTool.prototype.__onkeyup = function (keyCode) {
        Tool.prototype.__onkeyup.call(this, keyCode);
        if (this.keyCodes.shift === keyCode) {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return WireTool;
});