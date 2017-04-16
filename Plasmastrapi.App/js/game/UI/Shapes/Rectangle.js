define([
    "../Base/UIElement",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Geometry"
],
function (UIElement, $, Geometry) {

    Rectangle.prototype = Object.create(UIElement.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(x, y, width, height, meshDisplayOptions) {
        // inherits from
        UIElement.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(width, height)), meshDisplayOptions);
    };

    return Rectangle;
});