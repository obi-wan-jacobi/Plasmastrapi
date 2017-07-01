define(['primitive', 'vertex', 'validator'],
function (Primitive, Vertex, validator) {

    Curve.prototype = Object.create(Primitive.prototype);
    Curve.prototype.constructor = Curve;
    function Curve(vertices) {
        Primitive.call(this);
        validator.validateType(this, vertices, Vertex);
        this.vertices = vertices
    };

    return Line;
});