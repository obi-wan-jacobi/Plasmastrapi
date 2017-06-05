define([
    // Base
    'ui-element',
    // Components
    'pickable-component'
],
function (UIElement, PickableComponent) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, mesh, MeshDisplaySettings, callee, fnOnPick) {
        // inherits from
        UIElement.call(this, x, y, mesh, MeshDisplaySettings);

        // configure click action
        var pickableComponent = this.getComponent(PickableComponent);
    };
    
    return Button;
});