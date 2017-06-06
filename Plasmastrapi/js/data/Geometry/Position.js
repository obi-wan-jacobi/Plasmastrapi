define(['Primitive'], function (Primitive) {

    Position.prototype = Object.create(Primitive.prototype);
    Position.prototype.constructor = Position;
    function Position(x, y) {
        Primitive.call(this);
        this.__validateDataType(x, "Number");
        this.__validateDataType(y, "Number");
        this.x = x;
        this.y = y;
    };

    return Position;
});