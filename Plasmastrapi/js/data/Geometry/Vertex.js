define(['Primitive'], function (Primitive) {

    Vertex.prototype = Object.create(Primitive.prototype);
    Vertex.prototype.constructor = Vertex;
    function Vertex(x, y) {
        Primitive.call(this);
        this.__validateDataType(x, "Number");
        this.__validateDataType(y, "Number");
        this.x = x;
        this.y = y;
    };

    return Vertex;
});