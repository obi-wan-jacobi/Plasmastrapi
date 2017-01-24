define(["../Base/UIElement", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (UIElement, $, Geometry) {

    Area.prototype = Object.create(UIElement.prototype);
    Area.prototype.constructor = Area;
    function Area(x, y, imageHandle) {
        // inherits from
        UIElement.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // image
        var imageComponent = new $.ImageComponent(imageHandle);

        // configure image as collision mesh
        var meshComponent = new $.MeshComponent(imageComponent.mesh);

        // area is pickable
        var pickableComponent = new $.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(imageComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };

    return Area;
});