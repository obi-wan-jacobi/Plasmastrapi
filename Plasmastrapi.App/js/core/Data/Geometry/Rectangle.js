define(['polygon', 'vertex'], function (Polygon, Vertex) {

    Rectangle.prototype = Object.create(Polygon.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(width, height) {
        width = width || 0;
        height = height || 0;
        Polygon.call(this, [
            // follow CAST pattern (account for canvas y-axis inversion)
            new Vertex(width / 2, -height / 2),
            new Vertex(-width / 2, -height / 2),
            new Vertex(-width / 2, height / 2),
            new Vertex(width / 2, height / 2)
        ]);
    };

    return Rectangle;
});