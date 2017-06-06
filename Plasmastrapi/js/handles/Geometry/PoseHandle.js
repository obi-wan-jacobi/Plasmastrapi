define(['handle', 'Pose', 'pose-display-settings'],
function (Handle, Pose, PoseDisplaySettings) {

    PoseHandle.prototype = Object.create(Handle.prototype);
    PoseHandle.prototype.constructor = PoseHandle;
    function PoseHandle(pose) {
        Handle.call(this, pose, displaySettings, Pose, PoseDisplaySettings);
    };
    PoseHandle.prototype.getPosition = function () {
        return new Position(this.target.x, this.target.y);
    };
    PoseHandle.prototype.setPosition = function (newPosition) {
        if (!(newPosition instanceof Position)) {
            throw new Error(this.constructor.name + ':position set - ' + newPosition + ' is not an instance of ' + Position.name);
        }
        this.target = new Pose(newPosition.x, newPosition.y, this.target.a);
        return newPosition;
    }
    PoseHandle.prototype.getOrientation = function () {
        return this.target.a;
    };
    PoseHandle.prototype.setOrientation = function (newOrientation) {
        this.target = new Pose(this.target.x, this.target.y, newOrientation);
        return newOrientation
    };

    return PoseHandle;
});