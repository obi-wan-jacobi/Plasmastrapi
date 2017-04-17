define([
    "./UIElement",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$Compatibility"
],
function (UIElement, $Data, $Compatibility) {

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