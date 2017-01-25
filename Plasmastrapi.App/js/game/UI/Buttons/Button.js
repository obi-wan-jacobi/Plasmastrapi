define(["../Base/UIElement", "../../../engine/Components/$Components"], function (UIElement, $) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, imageHandle, fnOnSelect) {
        // inherits from
        UIElement.call(this, x, y, imageHandle);

        // configure click action
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onselect', this, fnOnSelect);
    };
    
    return Button;
});