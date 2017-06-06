define(['mesh', 'vertex'], function (Mesh, Vertex) {

    Rectangle.prototype = Object.create(Mesh.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(width, height) {
        Mesh.call(this, [
            // follow CAST pattern (account for canvas y-axis inversion)
            new Vertex(width / 2, -height / 2),
            new Vertex(-width / 2, -height / 2),
            new Vertex(-width / 2, height / 2),
            new Vertex(width / 2, height / 2)
        ]);
    };

    return Rectangle;
});