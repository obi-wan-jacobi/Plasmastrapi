define([
    "../../../engine/Objects/Entity",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Geometry",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$PickableTraits"],
function (Entity, $, Geometry, Graphics, $PickableTraits) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(Entity.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var spriteHandle = new Graphics.SpriteHandle('ondrawgameentities', this.sprite);
        var spriteComponent = new $.SpriteComponent(spriteHandle);

        // configure sprite as collision mesh
        var meshComponent = new $.MeshComponent(spriteComponent.mesh);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // configure pick action
        pickableComponent.addEventListener('onpick', this, this.__onpick);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        // tool compatibility
        $PickableTraits.Default.call(pickableComponent);
        $PickableTraits.Trashable.call(pickableComponent);
    };
    CircuitElement.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    
    return CircuitElement;
});