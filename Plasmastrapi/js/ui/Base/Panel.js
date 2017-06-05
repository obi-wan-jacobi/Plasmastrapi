define([
    // Base
    'ui-element'
],
function (UIElement) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(x, y, mesh, MeshDisplaySettings) {
        // inherits from
        UIElement.call(this, x, y, mesh, MeshDisplaySettings);
    };

    return Panel;
});