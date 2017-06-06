define(['primitive', 'vertex'],
function (Primitive, Vertex) {

    Mesh.prototype = Object.create(Primitive.prototype);
    Mesh.prototype.constructor = Mesh;
    function Mesh(vertices) {
        Primitive.call(this);
        this.__validateDataType(vertices, Vertex);
        this.vertices = vertices;
    };
    Mesh.prototype.clone = function () {
        var clonedVertices = [];
        for (var i = 0, L = this.vertices.length; i < L; i++) {
            clone.push(new Vertex(this.vertices[i].x, this.vertices[i].y));
        }
        return new Mesh(clonedVertices);
    };

    return Mesh;
});