define(["../../engine/Objects/Entity"], function (Entity) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(Entity.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new Components.PoseComponent(position, 0);

        // sprite
        var spriteComponent = new Components.SpriteComponent(this.sprite);

        // configure sprite as collision mesh
        var meshComponent = new Components.MeshComponent(spriteComponent.mesh);

        // entity is pickable
        var pickableComponent = new Components.PickableComponent();

        // configure pick action
        pickableComponent.addEventListener('onpick', this, this.__onpick);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    CircuitElement.prototype.__onpick = function () {
        toolController.equip(tools.placingTool, this);
    };
    
    return Gate;
});