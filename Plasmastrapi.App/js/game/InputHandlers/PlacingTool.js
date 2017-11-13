define(['input-handler', 'position'],
function (InputHandler, Position) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(engine, target) {
        InputHandler.call(this, engine);
        this.__inputController = this.__engine.getController('input-controller');
        this.__pickController = this.__engine.getController('pick-controller');
        this.__labController = this.__engine.getController('lab-controller');
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
        if (this.__target) {
            this.__target.getComponent('pick-component').disable();
            this.__target.load();
        }
    };
    PlacingTool.prototype.__onunload = function () {
        this.__target = null;
        this.__targetPoseComponent = null;
    };
    // public methods
    PlacingTool.prototype.onkeydown = function () {
    };
    PlacingTool.prototype.onkeyup = function () {
    };
    PlacingTool.prototype.onenter = function () {
    };
    PlacingTool.prototype.onescape = function () {
    };
    PlacingTool.prototype.onmousemove = function (mouseHandle) {
        this.__targetPoseComponent.getHandle().setPosition(mouseHandle.getData());
    };
    PlacingTool.prototype.onmousedown = function () {
    };
    PlacingTool.prototype.onmouseup = function () {
    };
    PlacingTool.prototype.onclick = function () {
        this.__target.getComponent('pick-component').enable();
        this.__target = null;
        this.__targetPoseComponent = null;
        this.__labController.idle();
    };
    PlacingTool.prototype.dispose = function () {
        if (this.__target) {
            this.__labController.getDesignArea().confine(this.__target);
            this.__target.getComponent('pick-component').enable();
        }
        this.unload();
    };

    return PlacingTool;
});