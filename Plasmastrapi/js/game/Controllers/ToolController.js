define([
    // Base
    'controller',
    // Components
    'pick-component',
    'pose-component',
    // Tools
    'cutting-tool',
    'picking-tool',
    'placing-tool',
    'trash-tool',
    'wire-tool',
    'cutting-tool-cursor',
    'trash-tool-cursor',
],
    function (Controller, MouseComponent) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController() {
        Controller.call(this);
        // TODO:
        // MouseComponent
        // KeyboardComponent
        //
        this.__tool = null;
        this.__hotkeys = null;
    };
        // public methods
    ToolController.prototype.equip = function (tool) {
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__tool = tool;
        if (!this.__tool.isEngineInjected) {
            this.__tool.injectEngine(this.__engine);
        }
        [].shift.call(arguments); // remove tool from arguments
        [].push.call(arguments, this.__x || -Number.MAX_SAFE_INTEGER / 2); // add x coordinate
        [].push.call(arguments, this.__y || -Number.MAX_SAFE_INTEGER / 2); // add y coordinate
        this.__tool.equip.apply(this.__tool, arguments);
    };

    return ToolController;
});