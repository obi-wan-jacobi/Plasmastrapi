define(['system', 'pick-component'],
function (System, PickComponent) {

    MouseComponent.prototype.__isCursorWithinMeshBoundary = function (cursor) {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        return meshComponent.getHandle().checkPointCollision(cursor);
    };

    // CLASS MouseSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem() {
        System.call(this);
    };
    // private methods
    PickSystem.prototype.__onload = function () {

    };
    PickSystem.prototype.__onunload = function () {

    };
    // public methods
    PickSystem.prototype.loopOnce = function () {

    };

    return PickSystem;
});