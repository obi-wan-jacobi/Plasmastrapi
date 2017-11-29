define(['input-handler', 'utils'],
function (InputHandler, utils) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(engine, target) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__target = target;
        this.__targetPoseComponent = null;
    };
    // private methods
    PlacingTool.prototype.__oninit = function () {
        if (!utils.validator.isInstanceOfType(this.__target, 'selection-box')) {
            this.__targetPoseComponent = this.__target.getComponent('pose-component');
            var position = this.__targetPoseComponent.getHandle().getPosition();
            if (position.x === 0 && position.y === 0) {
                var currentMousePosition = this.__engine.getController('input-controller').getMousePosition();
                this.__targetPoseComponent.getHandle().setPosition(currentMousePosition);
            }
        }
    };
    PlacingTool.prototype.__onload = function () {
        // Select target
        this.__target.getComponent('pick-component').select();
        // Set cursor
        this.__cursorController.setMove();
    };
    PlacingTool.prototype.__onunload = function () {
        // Deselect target
        this.__target.getComponent('pick-component').deselect();
        // Set cursor
        this.__cursorController.setDefault();
    };
    // public methods
    PlacingTool.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    PlacingTool.prototype.keyup = function (keyboardHandle) {
    };
    PlacingTool.prototype.enter = function () {
    };
    PlacingTool.prototype.escape = function () {
    };
    PlacingTool.prototype.mousemove = function (position) {
        if (this.__targetPoseComponent) {
            this.__targetPoseComponent.getHandle().setPosition(position);
        } else {
            this.__target.pullTo(position);
        }
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