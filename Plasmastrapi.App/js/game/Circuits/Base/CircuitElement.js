define(["../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

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
        var spriteHandle = new Graphics.SpriteHandle(this.__engine.drawSystem.DISPLAYLAYERS.GAMEENTITIES, this.sprite);
        var spriteComponent = new Components.SpriteComponent(spriteHandle);

        // configure sprite as collision mesh
        var meshComponent = new Components.MeshComponent(spriteComponent.mesh);

        // entity is pickable
        var pickableComponent = new Components.PickableComponent();

        // configure pick action
        pickableComponent.addEventListener('onselect', this, this.__onselect);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    CircuitElement.prototype.__onselect = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    
    return Gate;
});