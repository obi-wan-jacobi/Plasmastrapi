define(["../Base/UIElement", "../../../engine/Namespaces/$Components"], function (UIElement, $) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel() {
        UIElement.call(this);
        // Configure entity
        var poseComponent = new $.PoseComponent();
        var meshComponent = new $.MeshComponent();
        var pickableComponent = new $.PickableComponent();
        var imageComponent = new $.ImageComponent();
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
        this.addComponent(imageComponent);
    };

    return Panel;
});