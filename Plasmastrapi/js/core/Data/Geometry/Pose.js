define(['primitive', 'validator'], function (Primitive, validator) {

    Pose.prototype = Object.create(Primitive.prototype);
    Pose.prototype.constructor = Pose;
    function Pose(x, y, a) {
        Primitive.call(this);
        this.x = x === undefined || x === null ? 0 : x;
        this.y = y === undefined || y === null ? 0 : y;
        this.a = a === undefined || a === null ? 0 : a;
        validator.validateType(this, this.x, 'number');
        validator.validateType(this, this.y, 'number');
        validator.validateType(this, this.a, 'number');
    };

    return Pose;
});