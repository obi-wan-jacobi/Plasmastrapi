define(['primitive', 'vertex', 'validator'],
function (Primitive, Vertex, validator) {

    Line.prototype = Object.create(Primitive.prototype);
    Line.prototype.constructor = Line;
    function Line(tailVertex, headVertex) {
        Primitive.call(this);
        validator.validateInstanceType(this, tailVertex, Vertex);
        validator.validateInstanceType(this, headVertex, Vertex);
        this.tailVertex = tailVertex;
        this.headVertex = headVertex;
    };

    return Line;
});