define(["../../engine/Objects/Entity", "../../engine/Components/$Components"], function (Entity, $) {

    Area.prototype = Object.create(Entity.prototype);
    Area.prototype.constructor = Area;
    function Area() {
        Entity.call(this);
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