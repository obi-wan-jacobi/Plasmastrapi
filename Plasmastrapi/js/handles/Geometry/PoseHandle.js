define([],
function () {

    function PoseHandle(pose) {
        this.__pose = pose;
    };
    PoseHandle.prototype.getPosition = function () {
        return new Position(this.__pose.x, this.__pose.y);
    };
    PoseHandle.prototype.setPosition = function (newPosition) {
        if (!(newPosition instanceof Position)) {
            throw new Error(this.constructor.name + ':position set - ' + newPosition + ' is not an instance of ' + Position.name);
        }
        var oldPosition = new Position(this.__pose.x, this.__pose.y);
        this.__pose = new Pose(newPosition.x, newPosition.y, this.__pose.a);
        return [newPosition, oldPosition];
    }
    PoseHandle.prototype.getOrientation = function () {
        return this.__pose.a;
    };
    PoseHandle.prototype.setOrientation = function (newOrientation) {
        var oldOrientation = this.__pose.a;
        this.__pose = new Pose(this.__pose.x, this.__pose.y, newOrientation);
        return [newOrientation, oldOrientation];
    };

    return PoseHandle;
});