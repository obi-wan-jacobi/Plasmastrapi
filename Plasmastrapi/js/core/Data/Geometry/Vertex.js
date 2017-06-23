define(['Primitive'], function (Primitive) {

    Vertex.prototype = Object.create(Primitive.prototype);
    Vertex.prototype.constructor = Vertex;
    function Vertex(x, y) {
        Primitive.call(this);
        validator.validateType(this, x, 'number');
        validator.validateType(this, y, 'number');
        this.x = x;
        this.y = y;
    };

    return Vertex;
});