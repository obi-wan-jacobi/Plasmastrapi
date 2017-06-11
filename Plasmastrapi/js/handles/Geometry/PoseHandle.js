define(['handle', 'Pose', 'pose-display-settings'],
function (Handle, Pose, PoseDisplaySettings) {

    PoseHandle.prototype = Object.create(Handle.prototype);
    PoseHandle.prototype.constructor = PoseHandle;
    function PoseHandle(pose, displaySettings) {
        Handle.call(this, pose, displaySettings, Pose, PoseDisplaySettings);
    };
    PoseHandle.prototype.getPosition = function () {
        return new Position(this.__data.x, this.__data.y);
    };
    PoseHandle.prototype.setPosition = function (newPosition) {
        if (!(newPosition instanceof Position)) {
            throw new Error(this.constructor.name + ':position set - ' + newPosition + ' is not an instance of ' + Position.name);
        }
        this.__data = new Pose(newPosition.x, newPosition.y, this.__data.a);
    }
    PoseHandle.prototype.getOrientation = function () {
        return this.__data.a;
    };
    PoseHandle.prototype.setOrientation = function (newOrientation) {
        this.__data = new Pose(this.__data.x, this.__data.y, newOrientation);
    };

    Terminal.prototype.__setPoseRelativeToParentElement = function () {
        var parentElementPose = this.__parent.getComponent(PoseComponent)
        var position = parentElementPose.position;
        var orientation = parentElementPose.orientation;
        var templateX = this.__offset.x;
        var templateY = this.__offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent(PoseComponent);
        poseComponent.position = new Position(x, y);
        poseComponent.orientation = orientation;
    };

    return PoseHandle;
});