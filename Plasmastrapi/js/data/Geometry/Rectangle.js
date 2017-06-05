define(['mesh', 'position'], function (Mesh, Position) {

    Rectangle.prototype = Object.create(Mesh.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(width, height) {
        Mesh.call(this, [
            // follow CAST pattern (account for canvas y-axis inversion)
            new Position(width / 2, -height / 2),
            new Position(-width / 2, -height / 2),
            new Position(-width / 2, height / 2),
            new Position(width / 2, height / 2)
        ]);
    };

    return Rectangle;
});