define(['Primitive'], function (Primitive) {

    Pose.prototype = Object.create(Primitive.prototype);
    Pose.prototype.constructor = Pose;
    function Pose(x, y, a) {
        Primitive.call(this);
        this.x = x || 0;
        this.y = y || 0;
        this.a = a || 0;
        validator.validateType(this, x, "Number");
        validator.validateType(this, y, "Number");
        validator.validateType(this, a, "Number");
    };

    return Pose;
});