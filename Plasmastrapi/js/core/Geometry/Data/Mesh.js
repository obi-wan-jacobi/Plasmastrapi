define(['position'], function (Position) {

    function Mesh(vertices) {
        // mesh has an 'immutable' vertex template 
        this.template = vertices;
        // mesh has a collection of 'current' vertex positions
        this.vertices = [];
        for (var i = 0, L = vertices.length; i < L; i++) {
            this.vertices.push(new Position(vertices[i].x, vertices[i].y));
        }
    };

    return Mesh;
});