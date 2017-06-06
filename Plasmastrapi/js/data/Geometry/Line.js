define(['primitive', 'vertex'],
function (Primitive, Vertex) {

    Line.prototype = Object.create(Primitive.prototype);
    Line.prototype.constructor = Line;
    function Line(tailVertex, headVertex) {
        Primitive.call(this);
        this.__validateDataType(tailVertex, Vertex);
        this.__validateDataType(headVertex, Vertex);
        this.tailVertex = tailVertex;
        this.headVertex = headVertex;
    };

    return Line;
});