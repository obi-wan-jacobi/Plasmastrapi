define(['input-handler'],
function (InputHandler) {

    SpawningTool.prototype = Object.create(InputHandler.prototype);
    SpawningTool.prototype.constructor = SpawningTool;
    function SpawningTool(engine, logicElementString) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__target = this.__engine.getFactory('augmented-logic-element-factory').create(logicElementString);
        this.__targetPoseComponent = this.__target.getComponent('pose-component');
    };
    // private methods
    SpawningTool.prototype.__oninit = function () {
        var position = this.__targetPoseComponent.getHandle().getPosition();
        if (position.x === 0 && position.y === 0) {
            var currentMousePosition = this.__engine.getController('input-controller').getMousePosition();
            this.__targetPoseComponent.getHandle().setPosition(currentMousePosition);
        }
    };
    SpawningTool.prototype.__onload = function () {
        // Set cursor
        this.__cursorController.setMove();
    };
    SpawningTool.prototype.__onunload = function () {
        // Set cursor
        this.__cursorController.setDefault();
    };
    // public methods
    SpawningTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            this.__labController.hotkey(keyboardHandle.getKeyString());
        }
    };
    SpawningTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    SpawningTool.prototype.enter = function () {
    };
    SpawningTool.prototype.escape = function () {
    };
    SpawningTool.prototype.mousemove = function (position) {
        this.__targetPoseComponent.getHandle().setPosition(position);
    };
    SpawningTool.prototype.mousedown = function () {
    };
    SpawningTool.prototype.mouseup = function () {
    };
    SpawningTool.prototype.click = function () {
        this.__target = null;
        this.__targetPoseComponent = null;
        this.__labController.idle();
    };
    SpawningTool.prototype.dispose = function () {
        this.unload();
        if (this.__target) {
            this.__target.destroy();
        }
        this.__target = null;
        this.__targetPoseComponent = null;
        this.__labController.setRepeatLastActionOff();
    };

    return SpawningTool;
});