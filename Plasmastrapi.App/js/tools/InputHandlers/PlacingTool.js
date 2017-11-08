define(['input-handler', 'pick-component', 'pose-component', 'position'],
function (InputHandler, PickComponent, PoseComponent, Position) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(engine, target) {
        InputHandler.call(this, engine);
        this.__target = target;
        this.__poseComponent = this.__target.getComponent(PoseComponent);
    };
    // private methods
    PlacingTool.prototype.__oninit = function () {
        this.__target.unload();
        // draw the target off-screen rather than at point (0, 0) if its position has not been initialized
        var position = this.__poseComponent.getHandle().getPosition();
        if (position.x === 0 && position.y === 0) {
            this.__poseComponent.getHandle().setPosition(new Position(-9999, -9999));
        }
    };
    PlacingTool.prototype.__onload = function () {
        if (this.__target) {
            this.__target.load();
            this.__target.getComponent(PickComponent).disable();
        }
    };
    PlacingTool.prototype.__onunload = function () {
        if (this.__target) {
            this.__target.unload();
        }
    };
    // public methods
    PlacingTool.prototype.onkeydown = function () {
    };
    PlacingTool.prototype.onkeyup = function () {
    };
    PlacingTool.prototype.onkeypress = function () {
    };
    PlacingTool.prototype.onenter = function () {
    };
    PlacingTool.prototype.onescape = function () {
    };
    PlacingTool.prototype.onmousemove = function (mouseHandle) {
        if (this.__poseComponent) {
            this.__poseComponent.getHandle().setPosition(mouseHandle.getData());
        }
    };
    PlacingTool.prototype.onmousedown = function () {
    };
    PlacingTool.prototype.onmouseup = function () {
    };
    PlacingTool.prototype.onclick = function () {
        this.__target.getComponent(PickComponent).enable();
        this.__target = null;
        this.__poseComponent = null;
        this.__labController.idle();
    };
    PlacingTool.prototype.dispose = function () {
        this.unload();
        if (this.__target) {
            var target = this.__target;
            this.__target = null;
            this.__poseComponent = null;
            target.destroy();
        }
    };

    return PlacingTool;
});