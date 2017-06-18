define(['Primitive'], function (Primitive) {

    Vertex.prototype = Object.create(Primitive.prototype);
    Vertex.prototype.constructor = Vertex;
    function Vertex(x, y) {
        Primitive.call(this);
        validator.validateType(this, x, "Number");
        validator.validateType(this, y, "Number");
        this.x = x;
        this.y = y;
    };

    return Vertex;
});