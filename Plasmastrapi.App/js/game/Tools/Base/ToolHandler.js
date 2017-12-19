define(['input-handler', 'utils'],
function (InputHandler, utils) {

    function enableElement(element) {
        element.getComponent('pick-component').enable();
    };

    function disableElement(element) {
        element.getComponent('pick-component').disable();
    };

    ToolHandler.prototype = Object.create(InputHandler.prototype);
    ToolHandler.prototype.constructor = ToolHandler;
    function ToolHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__revisionController = this.__engine.getController('revision-controller');
        this.__selectionBoxController = this.__engine.getController('selection-box-controller');
        this.__toolActionFactory = this.__engine.getFactory('tool-action-factory');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
    };
    // private methods
    ToolHandler.prototype.__oninit = function () {
    };
    ToolHandler.prototype.__onload = function () {
    };
    ToolHandler.prototype.__onunload = function () {
    };
    ToolHandler.prototype.__getElementContainer = function (circuitElementTypeString) {
        utils.validator.validateClassType(this, circuitElementTypeString, 'circuit-element');
        if (utils.validator.isClassOfType(circuitElementTypeString, 'logic-element')) {
            return this.__logicElementContainer;
        } else if (utils.validator.isClassOfType(circuitElementTypeString, 'input-terminal')) {
            return this.__inputTerminalContainer;
        } else if (utils.validator.isClassOfType(circuitElementTypeString, 'output-terminal')) {
            return this.__outputTerminalContainer;
        } else if (utils.validator.isClassOfType(circuitElementTypeString, 'wire')) {
            return this.__wireContainer;
        }
        utils.validator.throw(this, 'getElementContainer', `${circuitElementTypeString} is not compatible with this tool`);
    };
    ToolHandler.prototype.__enableAll = function (circuitElementTypeString) {
        var container = this.__getElementContainer(circuitElementTypeString);
        container.forEach(enableElement);
    };
    ToolHandler.prototype.__disableAll = function (circuitElementTypeString) {
        var container = this.__getElementContainer(circuitElementTypeString);
        container.forEach(disableElement);
    };
    // public methods
    ToolHandler.prototype.keydown = function (keyboardHandle) {
        if (keyboardHandle.getKeyString() === 'z' && keyboardHandle.isCtrlKeyDown) {
            this.__revisionController.undo();
        } else if (keyboardHandle.getKeyString() === 'y' && keyboardHandle.isCtrlKeyDown) {
            this.__revisionController.redo();
        } else {
            this.__labController.hotkey(keyboardHandle.getKeyString());
        }
    };
    ToolHandler.prototype.keyup = function (keyboardHandle) {
    };
    ToolHandler.prototype.enter = function () {
    };
    ToolHandler.prototype.escape = function () {
    };
    ToolHandler.prototype.mousemove = function (position) {
    };
    ToolHandler.prototype.mousedown = function (position) {
    };
    ToolHandler.prototype.mouseup = function () {
    };
    ToolHandler.prototype.click = function () {
    };
    ToolHandler.prototype.dispose = function () {
        this.unload();
    };

    return ToolHandler;
});