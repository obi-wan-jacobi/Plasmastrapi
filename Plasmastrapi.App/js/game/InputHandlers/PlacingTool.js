define(['input-handler'],
function (InputHandler) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(engine, target) {
        InputHandler.call(this, engine);
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__target = target;
        this.__targetPoseComponent = this.__target.getComponent('pose-component');
    };
    // private methods
    PlacingTool.prototype.__oninit = function () {
        var position = this.__targetPoseComponent.getHandle().getPosition();
        if (position.x === 0 && position.y === 0) {
            var currentMousePosition = this.__engine.getController('input-controller').getMousePosition();
            this.__targetPoseComponent.getHandle().setPosition(currentMousePosition);
        }
    };
    PlacingTool.prototype.__onload = function () {
        // Disable everything
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__wireContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
        // Set cursor
        this.__cursorController.setMove();
    };
    PlacingTool.prototype.__onunload = function () {
        // Re-enable everything
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
        this.__wireContainer.forEach(enableElement);
        this.__inputTerminalContainer.forEach(enableElement);
        this.__outputTerminalContainer.forEach(enableElement);
        // Set cursor
        this.__cursorController.setDefault();
    };
    // public methods
    PlacingTool.prototype.keydown = function () {
    };
    PlacingTool.prototype.keyup = function () {
    };
    PlacingTool.prototype.enter = function () {
    };
    PlacingTool.prototype.escape = function () {
    };
    PlacingTool.prototype.mousemove = function (position) {
        this.__targetPoseComponent.getHandle().setPosition(position);
    };
    PlacingTool.prototype.mousedown = function () {
    };
    PlacingTool.prototype.mouseup = function () {
    };
    PlacingTool.prototype.click = function () {
        this.__labController.idle();
    };
    PlacingTool.prototype.dispose = function () {
        this.unload();
        if (this.__target) {
            this.__labController.getDesignArea().confine(this.__target);
        }
        this.__target = null;
        this.__targetPoseComponent = null;
    };

    return PlacingTool;
});