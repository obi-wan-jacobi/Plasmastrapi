define(["../Base/UIElement", "../../../engine/Namespaces/$Components", "../../Tools/PickableTraits/$PickableTraits"], function (UIElement, $, $PickableTraits) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, imageHandle, fnOnPick) {
        // inherits from
        UIElement.call(this, x, y, imageHandle);

        // configure click action
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onpick', this, fnOnPick);

        // tool compatibility
        $PickableTraits.Default.call(pickableComponent);
    };
    
    return Button;
});