define(["../../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

    // CLASS TerminalHandle
    TerminalHandle.prototype = Object.create(Entity.prototype);
    TerminalHandle.prototype.constructor = TerminalHandle;
    function TerminalHandle(x, y) {
        Entity.call(this);
        var poseComponent = new $.PoseComponent(new Geometry.Position(x, y), 0);
        this.addComponent(poseComponent);
    };

    return TerminalHandle;
});