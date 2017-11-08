define(['input-handler', 'position'],
function (InputHandler, Position) {

    PlacingTool.prototype = Object.create(InputHandler.prototype);
    PlacingTool.prototype.constructor = PlacingTool;
    function PlacingTool(engine, target) {
        InputHandler.call(this, engine);
        this.__target = target;
        this.__poseComponent = this.__target.getComponent('pose-component');
        this.__previousMousePosition = null;
        this.__targetAnchorPosition = null;
    };
    // private methods
    PlacingTool.prototype.__oninit = function () {
        this.__target.unload();
        // Draw the target off-screen if its position has not been initialized (0, 0)
        var position = this.__poseComponent.getHandle().getPosition();
        if (position.x === 0 && position.y === 0) {
            this.__poseComponent.getHandle().setPosition(new Position(-9999, -9999));
        } else {
            //this.__targetAnchorPosition = position;
        }
    };
    PlacingTool.prototype.__onload = function () {
        if (this.__target) {
            this.__target.load();
            this.__target.getComponent('pick-component').disable();
        }
    };
    PlacingTool.prototype.__onunload = function () {
        if (this.__target) {
            this.__target.unload();
        }
        this.__previousMousePosition = null;
        this.__targetAnchorPosition = null;
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
            var newPosition = mouseHandle.getData();
            if (this.__targetAnchorPosition && this.__previousMousePosition) {
                this.__targetAnchorPosition.x += (newPosition.x - this.__previousMousePosition.x);
                this.__targetAnchorPosition.y += (newPosition.y - this.__previousMousePosition.y);
                newPosition = this.__targetAnchorPosition;
            }
            if (!this.__targetAnchorPosition || (this.__targetAnchorPosition && this.__previousMousePosition)) {
                this.__poseComponent.getHandle().setPosition(newPosition);
            }
            this.__previousMousePosition = mouseHandle.getData();
        }
    };
    PlacingTool.prototype.onmousedown = function () {
    };
    PlacingTool.prototype.onmouseup = function () {
    };
    PlacingTool.prototype.onclick = function () {
        this.__target.getComponent('pick-component').enable();
        this.__target = null;
        this.__poseComponent = null;
        this.__labController.idle();
    };
    PlacingTool.prototype.dispose = function () {
        this.unload();
        if (this.__target) {
            this.__target.destroy();
            this.__target = null;
            this.__poseComponent = null;
        }
    };

    return PlacingTool;
});