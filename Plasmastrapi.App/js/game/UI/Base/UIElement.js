define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(x, y, mesh, meshDisplayOptions) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // configure image as collision mesh
        var meshComponent = new $.MeshComponent(mesh, meshDisplayOptions);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };

    return UIElement;
});