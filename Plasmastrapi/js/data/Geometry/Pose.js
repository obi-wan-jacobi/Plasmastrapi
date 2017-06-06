define(['Primitive'], function (Primitive) {

    Pose.prototype = Object.create(Primitive.prototype);
    Pose.prototype.constructor = Pose;
    function Pose(x, y, a) {
        Primitive.call(this);
        this.__validateDataType(x, "Number");
        this.__validateDataType(y, "Number");
        this.__validateDataType(a, "Number");
        this.x = x;
        this.y = y;
        this.a = a || 0;
    };

    return Pose;
});