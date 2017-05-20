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
    function Panel(x, y, mesh, meshDisplayOptions) {
        // inherits from
        UIElement.call(this, x, y, mesh, meshDisplayOptions);
        // apply tool compatibilities
        Pickable.call(this);
        DestructionZone.call(this);
    };

    return Panel;
});