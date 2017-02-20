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
    ToolController.prototype.__equip = function (tool, entity) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        this.__tool.injectEngine(this.__engine);
        this.__tool.equip(this.__x || -9999, this.__y || -9999);
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
    ToolController.prototype.equipNoTool = function () {
        this.__equip(new $Tools.NoTool());
    };
    ToolController.prototype.equipPickingTool = function () {
        this.__equip(new $Tools.PickingTool());
    };
    ToolController.prototype.equipPlacingTool = function (circuitElement, fnShiftKeyMouseUp) {
        this.__equip(new $Tools.PlacingTool(circuitElement, fnShiftKeyMouseUp));
    };
    ToolController.prototype.equipWireTool = function (terminal) {
        this.__equip(new $Tools.WireTool(terminal));
    };
    ToolController.prototype.equipCuttingTool = function () {
        this.__equip(new $Tools.CuttingTool());
    };
    ToolController.prototype.equipTrashTool = function () {
        this.__equip(new $Tools.TrashTool());
    };

    return ToolController;
});