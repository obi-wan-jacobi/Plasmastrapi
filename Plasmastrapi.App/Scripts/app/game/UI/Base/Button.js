define([
    // Base
    'ui-element',
    // Components
    'pickable-component',
    // Configs
    'pickable'
],
function (UIElement, PickableComponent, Pickable) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, mesh, meshDisplayOptions, callee, fnOnPick) {
        // inherits from
        UIElement.call(this, x, y, mesh, meshDisplayOptions);

        // configure click action
        var pickableComponent = this.getComponent(PickableComponent);
        pickableComponent.addEventListener('onpick', callee, fnOnPick);

        // apply tool compatibilities
        Pickable.call(this);
    };
    
    return Button;
});