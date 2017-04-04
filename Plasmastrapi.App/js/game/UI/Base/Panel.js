define([
    "./UIElement",
    "../../../engine/Namespaces/$Data"
],
function (UIElement, $Data) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(x, y, imageHandle, /* optional */ mesh, /* optional */ meshDisplayOptions) {
        UIElement.call(this, x, y, imageHandle, mesh || $Data.Geometry.MeshFromImageHandle(imageHandle), meshDisplayOptions);
    };

    return Panel;
});