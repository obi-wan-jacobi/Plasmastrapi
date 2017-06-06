define(['primitive', 'vertex'],
function (Primitive, Vertex) {

    Mesh.prototype = Object.create(Primitive.prototype);
    Mesh.prototype.constructor = Mesh;
    function Mesh(vertices) {
        Primitive.call(this);
        this.__validateDataType(vertices, Vertex);
        this.template = vertices;
        this.vertices = [];
        for (var i = 0, L = vertices.length; i < L; i++) {
            this.vertices.push(new Vertex(vertices[i].x, vertices[i].y));
        }
    };

    return Mesh;
});