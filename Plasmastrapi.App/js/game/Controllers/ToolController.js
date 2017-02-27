define(["../../engine/Objects/Controller",
        "../../engine/Namespaces/$Components",
        "../Namespaces/$Tools"],
function (Controller, $, $Tools) {

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
    };
    // private methods
    ToolController.prototype.__onload = function () {
        if (this.__tool) {
            this.__equip(this__tool);
        }
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__updateLastPosition);
    };
    ToolController.prototype.__onunload = function () {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__updateLastPosition);
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