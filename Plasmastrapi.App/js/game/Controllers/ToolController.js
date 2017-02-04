define(["../../engine/Objects/Controller",
        "../../engine/Namespaces/$Components",
        "../Tools/$Tools"],
function (Controller, $, $Tools) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController() {
        Controller.call(this);
        this.__tool = null;
        this.__tools = [];
        this.__noTool = this.__tools[0] = new $Tools.NoTool();
        this.__pickingTool = this.__tools[1] = new $Tools.PickingTool();
        this.__placingTool = this.__tools[2] = new $Tools.PlacingTool();
        this.__wireTool = this.__tools[3] = new $Tools.WireTool();
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
    ToolController.prototype.filterByTraits = function (traitList) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (traitList.resolve(pickableComponent)) {
                pickableComponent.enable();
            } else {
                pickableComponent.disable();
            }
        });
    };
    ToolController.prototype.filterByCompatibility = function (compatibilityList) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (compatibilityList.resolve(pickableComponent)) {
                pickableComponent.enable();
            } else {
                pickableComponent.disable();
            }
        });
    };
    ToolController.prototype.filterByTraitsAndCompatibility = function (traitList, compatibilityList) {
        this.__engine.pickablesContainer.forEach(function (pickableComponent) {
            if (traitList.resolve(pickableComponent) || compatibilityList.resolve(pickableComponent)) {
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
    ToolController.prototype.equipPlacingTool = function (circuitElement) {
        this.__equip(this.__placingTool, circuitElement);
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