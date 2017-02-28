define([
    "../../engine/Objects/Controller",
    "../../engine/Namespaces/$Components",
    "../Namespaces/$Tools",
    "../Namespaces/$UI",
    "../Namespaces/$Circuits"
],
function (Controller, $, $Tools, $UI, $Circuits) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController() {
        Controller.call(this);
        this.__x = null;
        this.__y = null;
        this.__tool = null;
        this.__pickingTool = new $Tools.PickingTool();
        this.__placingTool = new $Tools.PlacingTool();
        this.__wireTool = new $Tools.WireTool();
        this.__cuttingTool = new $Tools.CuttingTool();
        this.__trashTool = new $Tools.TrashTool();
        this.__hotkeys = null;
    };
    // private methods
    ToolController.prototype.__oninit = function () {
        var andGateSpawner = new $UI.SpawnerButton(50, 40, $Circuits.AndGate, "[1]");
        var nandGateSpawner = new $UI.SpawnerButton(100, 40, $Circuits.NandGate, "[2]");
        var orGateSpawner = new $UI.SpawnerButton(150, 40, $Circuits.OrGate, "[3]");
        var xorGateSpawner = new $UI.SpawnerButton(200, 40, $Circuits.XorGate, "[4]");
        var powerSourceSpawner = new $UI.SpawnerButton(250, 40, $Circuits.PowerSource, "[5]");

        andGateSpawner.injectEngine(this.__engine);
        nandGateSpawner.injectEngine(this.__engine);
        orGateSpawner.injectEngine(this.__engine);
        xorGateSpawner.injectEngine(this.__engine);
        powerSourceSpawner.injectEngine(this.__engine);

        var self = this;
        this.__hotkeys = {
            "1": function () { andGateSpawner.getComponent($.PickableComponent).pick(); },
            "2": function () { nandGateSpawner.getComponent($.PickableComponent).pick(); },
            "3": function () { orGateSpawner.getComponent($.PickableComponent).pick(); },
            "4": function () { xorGateSpawner.getComponent($.PickableComponent).pick(); },
            "5": function () { powerSourceSpawner.getComponent($.PickableComponent).pick(); },
            "w": function () { self.equipCuttingTool(); },
            "q": function () { self.equipTrashTool(); },
        }
    };
    ToolController.prototype.__onload = function () {
        if (this.__tool) {
            this.__equip(this.__tool);
        }
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__updateLastPosition);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__dohotkey);
    };
    ToolController.prototype.__onunload = function () {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__updateLastPosition);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__dohotkey);
    };
    ToolController.prototype.__equip = function (tool /* arguments 1, argument 2, etc. */) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        if (!this.__tool.isEngineInjected) {
            this.__tool.injectEngine(this.__engine);
        }
        [].shift.call(arguments); // remove tool from arguments
        [].push.call(arguments, this.__x || -9999); // add x coordinate
        [].push.call(arguments, this.__y || -9999); // add y coordinate
        this.__tool.equip.apply(this.__tool, arguments);
    };
    ToolController.prototype.__updateLastPosition = function (position) {
        this.__x = position.x;
        this.__y = position.y;
    }
    ToolController.prototype.__dohotkey = function (keyCode) {
        this.__hotkeys[String.fromCharCode(keyCode).toLowerCase()]();
    };
    // public methods
    ToolController.prototype.setPickableTraitListFilter = function (pickableTraitList) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (pickableTraitList.resolve(pickableComponent)) {
                pickableComponent.enable();
            } else {
                pickableComponent.disable();
            }
        });
    };
    ToolController.prototype.equipPickingTool = function () {
        this.__equip(this.__pickingTool);
    };
    ToolController.prototype.equipPlacingTool = function (circuitElement, fnShiftKeyMouseUp) {
        this.__equip(this.__placingTool, circuitElement, fnShiftKeyMouseUp);
    };
    ToolController.prototype.equipWireTool = function (terminal) {
        this.__equip(this.__wireTool, terminal);
    };
    ToolController.prototype.equipCuttingTool = function () {
        this.__equip(this.__cuttingTool);
    };
    ToolController.prototype.equipTrashTool = function () {
        this.__equip(this.__trashTool);
    };

    return ToolController;
});