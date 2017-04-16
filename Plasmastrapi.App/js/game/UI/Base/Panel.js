define([
    "./UIElement",
    "../../../engine/Namespaces/$Data"
],
function (UIElement, $Data) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(x, y, mesh, meshDisplayOptions) {
        // inherits from
        UIElement.call(this, x, y, mesh, meshDisplayOptions);
        // apply tool compatibilities
        $Compatibility.Pickable.call(this);
        $Compatibility.DestructionZone.call(this);
    };

    return Panel;
});