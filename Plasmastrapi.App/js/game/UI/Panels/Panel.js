define(["../Base/UIElement", "../../../engine/Components/$Components"], function (UIElement, $) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel() {
        UIElement.call(this);
        // Configure entity
        var poseComponent = new $.PoseComponent();
        var meshComponent = new $.MeshComponent();
        var pickableComponent = new $.PickableComponent();
        var imageComponent = new $.ImageComponent();
        var drawableComponent = new $.DrawableComponent();
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
        this.addComponent(imageComponent);
    };

    return Panel;
});