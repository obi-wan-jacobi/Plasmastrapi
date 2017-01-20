define(["../../engine/Objects/Controller"], function (Controller) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController(entityRepository) {
        Controller.call(this);
        this.__tool = null;
        this.addEventListener('onload', this, this.__onload);
        this.addEventListener('onunload', this, this.__onunload);
    };
    // private methods
    ToolController.prototype.__onload = function () {
        this.equipMaterTool();
    };
    ToolController.prototype.__onload = function () {
        this.__tool.discard();
    };
    ToolController.prototype.__equip = function (tool) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        this.__tool.equip();
    };
    // public methods
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

});