define(['Primitive'], function (Primitive) {

    Position.prototype = Object.create(Primitive.prototype);
    Position.prototype.constructor = Position;
    function Position(x, y) {
        Primitive.call(this);
        this.x = x || 0;
        this.y = y || 0;
        this.__validateDataType(x, "Number");
        this.__validateDataType(y, "Number");
    };

    return Position;
});