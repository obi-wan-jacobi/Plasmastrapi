define(["../Base/UIElement", "../../../engine/Namespaces/$Components", "../../Namespaces/$Compatibility"], function (UIElement, $, $Compatibility) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, imageHandle, callee, fnOnPick) {
        // inherits from
        UIElement.call(this, x, y, imageHandle);

        // configure click action
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onpick', callee, fnOnPick);

        // tool compatibility
        $Compatibility.Pickable.call(this);
    };
    
    return Button;
});