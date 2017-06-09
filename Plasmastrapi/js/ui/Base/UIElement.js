define([
    // Base
    'entity',
    // Components
    'mesh-component',
    'pick-component',
    'pose-component',
    // Data
    'position',
],
function (Entity, MeshComponent, PickComponent, PoseComponent, Position) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(x, y, mesh, meshDisplaySettings) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Position(x, y);
        var poseComponent = new PoseComponent(position, 0);

        // configure collision mesh
        var meshComponent = new MeshComponent(mesh, meshDisplaySettings);

        // entity is pickable
        var pickComponent = new PickComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickComponent);
    };

    return UIElement;
});