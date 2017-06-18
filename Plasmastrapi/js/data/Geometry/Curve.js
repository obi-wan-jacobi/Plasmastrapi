define(['primitive', 'vertex'],
function (Primitive, Vertex) {

    Curve.prototype = Object.create(Primitive.prototype);
    Curve.prototype.constructor = Curve;
    function Curve(vertices) {
        Primitive.call(this);
        validator.validateType(this, vertices, Vertex);
        this.vertices = vertices
    };

    return Line;
});