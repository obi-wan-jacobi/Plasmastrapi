define(['Primitive'], function (Primitive) {

    Pose.prototype = Object.create(Primitive.prototype);
    Pose.prototype.constructor = Pose;
    function Pose(x, y, a) {
        Primitive.call(this);
        this.x = x || 0;
        this.y = y || 0;
        this.a = a || 0;
        this.__validateDataType(x, "Number");
        this.__validateDataType(y, "Number");
        this.__validateDataType(a, "Number");
    };

    return Pose;
});