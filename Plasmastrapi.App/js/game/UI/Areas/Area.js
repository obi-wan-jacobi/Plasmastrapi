define(["../Base/UIElement", "../../../engine/Components/$Components"], function (UIElement, $) {

    Area.prototype = Object.create(UIElement.prototype);
    Area.prototype.constructor = Area;
    function Area() {
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

    return Area;
});