define([
    // Base
    'entity',
    // Components
    'pose-component',
    // Data
    'position'
],
function (Entity, PoseComponent, Geometry) {

    // CLASS TerminalHandle
    TerminalHandle.prototype = Object.create(Entity.prototype);
    TerminalHandle.prototype.constructor = TerminalHandle;
    function TerminalHandle(x, y) {
        Entity.call(this);
        var poseComponent = new PoseComponent(new Position(x, y), 0);
        this.addComponent(poseComponent);
    };

    return TerminalHandle;
});