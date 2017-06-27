define(['entity', 'pose-component', 'pose'],
function (Entity, PoseComponent, Position) {

    // CLASS TerminalHandle
    TerminalHandle.prototype = Object.create(Entity.prototype);
    TerminalHandle.prototype.constructor = TerminalHandle;
    function TerminalHandle(x, y) {
        Entity.call(this);
        var poseComponent = new PoseComponent(new Pose(x, y));
        this.addComponent(poseComponent);
    };

    return TerminalHandle;
});