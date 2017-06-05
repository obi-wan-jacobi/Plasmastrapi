define(['position'], function (Position) {

    function Pose(x, y, a) {
        Position.call(this, x, y);
        this.a = a || 0;
    };

    return Pose;
});