define([
    // Base
    'ui-element',
    // Configs
    'destruction-zone',
    'pickable'
],
function (UIElement, DestructionZone, Pickable) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(x, y, mesh, MeshDisplaySettings) {
        // inherits from
        UIElement.call(this, x, y, mesh, MeshDisplaySettings);
        // apply tool compatibilities
        DestructionZone.call(this);
    };

    return Panel;
});