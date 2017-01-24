define(["../../../engine/Objects/Entity"], function (Entity) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement() {
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var 
        var imageComponent = new $.ImageComponent(sprite);

        // configure sprite as collision mesh
        var meshComponent = new $.MeshComponent(imageComponent.mesh);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(imageComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };

    return UIElement;
});