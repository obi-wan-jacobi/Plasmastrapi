define(['data-handle', 'pose', 'position', 'pose-display-settings'],
function (DataHandle, Pose, Position, PoseDisplaySettings) {

    PoseHandle.prototype = Object.create(DataHandle.prototype);
    PoseHandle.prototype.constructor = PoseHandle;
    function PoseHandle(pose, displaySettings) {
        DataHandle.call(this, pose, displaySettings, Pose, PoseDisplaySettings);
    };
    PoseHandle.prototype.getPosition = function () {
        return new Position(this.__data.x, this.__data.y);
    };
    PoseHandle.prototype.setPosition = function (newPosition) {
        if (!(newPosition instanceof Position)) {
            validator.throw(this, 'position set', `${newPosition} is not an instance of ${Position.name}`);
        }
        this.__data = new Pose(newPosition.x, newPosition.y, this.__data.a);
    }
    PoseHandle.prototype.getOrientation = function () {
        return this.__data.a;
    };
    PoseHandle.prototype.setOrientation = function (newOrientation) {
        this.__data = new Pose(this.__data.x, this.__data.y, newOrientation);
    };

    return PoseHandle;
});