define(["../Base/UIElement", "../../../engine/Components/$Components", "../../Tools/Compatibility/$Compatibility"], function (UIElement, $, $Compatibility) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, imageHandle, fnOnSelect) {
        // inherits from
        UIElement.call(this, x, y, imageHandle);

        // configure click action
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onselect', this, fnOnSelect);

        // tool compatibility
        $Compatibility.Selectable.call(pickableComponent);
    };
    Button.prototype.__onselect = function () {
        this.getComponent($.PickableComponent).deselect();
    };
    
    return Button;
});