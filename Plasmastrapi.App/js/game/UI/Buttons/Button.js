define(["../Base/UIElement", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (UIElement, $, Geometry) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, image, fnOnSelect) {
        // inherits from
        UIElement.call(this, x, y, image);

        // configure click action
        pickableComponent.addEventListener('onselect', this, fnOnSelect);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    
    return Button;
});