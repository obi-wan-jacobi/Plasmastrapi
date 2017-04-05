define([
    "../Base/Shape",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Geometry"
],
function (Shape, $, Geometry) {

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(x, y, width, height, meshDisplayOptions) {
        // inherits from
        Shape.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(width, height)), meshDisplayOptions);
    };

    return Rectangle;
});