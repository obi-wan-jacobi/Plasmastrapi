define([
    // Base
    'ui-element',
    // Components
    'pick-component'
],
function (UIElement, PickComponent) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, mesh, MeshDisplaySettings, callee, fnOnPick) {
        // inherits from
        UIElement.call(this, x, y, mesh, MeshDisplaySettings);

        // configure click action
        var pickComponent = this.getComponent(PickComponent);
    };
    
    return Button;
});