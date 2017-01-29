define(["../../engine/Objects/Controller",
        "../../engine/Components/$Components",
        "../Tools/NoTool",
        "../Tools/PickingTool",
        "../Tools/PlacingTool",
        "../Tools/WireTool",
        "../Tools/CuttingTool",
        "../Tools/TrashTool"],
function (Controller, $, NoTool, PickingTool, PlacingTool, WireTool, CuttingTool, TrashTool) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController() {
        Controller.call(this);
        this.__tool = null;
        this.__tools = [];
        this.__noTool = this.__tools[0] = new NoTool();
        this.__placingTool = this.__tools[1] = new PlacingTool();
        this.__pickingTool = this.__tools[2] = new PickingTool();
        //this.__wireTool = this.__tools[3] = new WireTool();
        //this.__CuttingTool = this.__tools[4] = new CuttingTool();
        //this.__TrashTool = this.__tools[5] = new TrashTool();
    };
    // private methods
    ToolController.prototype.__onload = function () {
        if (this.__tool) {
            this.__equip(this__tool);
        }
    };
    ToolController.prototype.__onunload = function () {
        if (this.__tool) {
            this.__tool.discard();
        }
    };
    ToolController.prototype.__equip = function (tool, entity) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        this.__tool.equip(entity);
    };
    // public methods
    ToolController.prototype.injectEngine = function (engine) {
        Controller.prototype.injectEngine.call(this, engine);
        for (var i = 0, L = this.__tools.length; i < L; i++) {
            if (!this.__tools[i].isEngineInjected) {
                this.__tools[i].injectEngine(this.__engine);
            }
        }
    };
    ToolController.prototype.filterByCompatibility = function (Compatibility) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (Compatibility.isSatisfiedBy(pickableComponent)) {
                pickableComponent.enable();
            } else {
                pickableComponent.disable();
            }
        });
    };
    ToolController.prototype.filterByTrait = function (Trait) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (Trait.isSatisfiedBy(pickableComponent)) {
                pickableComponent.enable();
            } else {
                pickableComponent.disable();
            }
        });
    };
    ToolController.prototype.equipNoTool = function () {
        this.__equip(this.__noTool);
    };
    ToolController.prototype.equipPickingTool = function () {
        this.__equip(this.__pickingTool);
    };
    ToolController.prototype.equipPlacingTool = function () {
        this.__equip(this.__placingTool);
    };
    ToolController.prototype.equipWireTool = function () {
        this.__equip(this.__wireTool);
    };
    ToolController.prototype.equipCuttingTool = function (entity) {
        this.__equip(this.__cuttingTool, entity);
    };
    ToolController.prototype.equipTrashTool = function () {
        this.__equip(this.__trashTool);
    };

    return ToolController;
});