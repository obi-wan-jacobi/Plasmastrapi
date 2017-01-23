define(["../../engine/Objects/Controller",
        "../Tools/NoTool",
        "../Tools/MasterTool",
        "../Tools/PlacingTool",
        "../Tools/WireTool",
        "../Tools/CuttingTool",
        "../Tools/TrashTool"],
    function (Controller, NoTool, MasterTool, PlacingTool, WireTool, CuttingTool, TrashTool) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController(entityContainer) {
        Controller.call(this);
        this.__tool = null;
    };
    // private methods
    ToolController.prototype.__onload = function () {
        //this.equipNoTool();
    };
    ToolController.prototype.__onunload = function () {
        //this.__tool.discard();
    };
    ToolController.prototype.__equip = function (tool) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        this.__tool.injectEngine(this.__engine);
        this.__tool.equip();
    };
    // public methods
    ToolController.prototype.equipNoTool = function () {
        this.__equip(new NoTool());
    };
    ToolController.prototype.equipMasterTool = function () {
        this.__equip(new MasterTool());
    };
    ToolController.prototype.equipPlacingTool = function () {
        this.__equip(new PlacingTool());
    };
    ToolController.prototype.equipWireTool = function () {
        this.__equip(new WireTool());
    };
    ToolController.prototype.equipCuttingTool = function () {
        this.__equip(new CuttingTool());
    };
    ToolController.prototype.equipTrashTool = function () {
        this.__equip(new TrashTool());
    };

    return ToolController;
});