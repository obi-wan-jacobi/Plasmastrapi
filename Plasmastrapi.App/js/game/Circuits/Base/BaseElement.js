define([
    "../../../engine/Objects/Entity",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Geometry",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$PickableTraits"],
function (Entity, $, Geometry, Graphics, $PickableTraits) {

    // CLASS BaseElement
    BaseElement.prototype = Object.create(Entity.prototype);
    BaseElement.prototype.constructor = BaseElement;
    function BaseElement(x, y) {
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
    };
    BaseElement.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };

    return BaseElement;
});
