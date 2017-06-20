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
    function (Controller, PickComponent, PoseComponent, CuttingTool, PickingTool, PlacingTool, TrashTool, WireTool, CuttingToolCursor, TrashToolCursor) {

    // CLASS ToolController
    ToolController.prototype = Object.create(Controller.prototype);
    ToolController.prototype.constructor = ToolController;
    function ToolController() {
        Controller.call(this);
        this.__x = null;
        this.__y = null;
        this.__tool = null;
        this.__pickingTool = new PickingTool();
        this.__placingTool = new PlacingTool();
        this.__wireTool = new WireTool();
        this.__cuttingTool = new CuttingTool();
        this.__trashTool = new TrashTool();
        this.__hotkeys = null;
    };
    // private methods
    ToolController.prototype.__init = function () {
        var self = this;
        this.__hotkeys = {
            '1': function () { self.__engine.sceneController.circuitDesignScene.andGateButton.getComponent(PickComponent).pick(); },
            '2': function () { self.__engine.sceneController.circuitDesignScene.nandGateButton.getComponent(PickComponent).pick(); },
            '3': function () { self.__engine.sceneController.circuitDesignScene.orGateButton.getComponent(PickComponent).pick(); },
            '4': function () { self.__engine.sceneController.circuitDesignScene.xorGateButton.getComponent(PickComponent).pick(); },
            '5': function () { self.__engine.sceneController.circuitDesignScene.powerSourceButton.getComponent(PickComponent).pick(); },
            'w': function () { self.equipCuttingTool(); },
            'q': function () { self.equipTrashTool(); },
        }
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
        [].push.call(arguments, this.__x || -Number.MAX_SAFE_INTEGER / 2); // add x coordinate
        [].push.call(arguments, this.__y || -Number.MAX_SAFE_INTEGER / 2); // add y coordinate
        this.__tool.equip.apply(this.__tool, arguments);
    };
    ToolController.prototype.__updateLastPosition = function (position) {
        this.__x = position.x;
        this.__y = position.y;
    }
    ToolController.prototype.__dohotkey = function (keyCode) {
        var fn = this.__hotkeys[String.fromCharCode(keyCode).toLowerCase()];
        if (fn) {
            fn();
        }
    };
    // public methods
    ToolController.prototype.load = function () {
        Controller.prototype.load.call(this);
        if (this.__isLoaded) {
            return;
        }
        if (this.__tool) {
            this.__equip(this.__tool);
        }
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__updateLastPosition);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__dohotkey);
    };
    ToolController.prototype.unload = function () {
        Controller.prototype.unload.call(this);
        if (!this.__isLoaded) {
            return;
        }
        if (this.__tool) {
            this.__tool.discard();
        }
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__updateLastPosition);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__dohotkey);
    };
    ToolController.prototype.setCompatibilityFilter = function (filter) {
        this.__engine.pickablesContainer.forEach(function (pickComponent) {
            if (filter.resolve(pickComponent)) {
                pickComponent.enable();
            } else {
                pickComponent.disable();
            }
        });
    };
    // tools
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