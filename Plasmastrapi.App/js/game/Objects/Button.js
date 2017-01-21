define(["../../engine/Objects/Entity", "../../engine/Components/nsComponents"], function (Entity, $) {

    // CLASS Button
    Button.prototype = Object.create(Entity.prototype);
    Button.prototype.constructor = Button;
    function Button(x, y, fnOnClick) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var sprite = circuitElementClass.prototype.sprite;
        var spriteComponent = new $.SpriteComponent(sprite);

        // configure sprite as graphic
        var drawableComponent = new $.DrawableComponent(DISPLAYLAYERS.UIENTITIES);

        // configure sprite as collision mesh
        var meshComponent = new $.MeshComponent(spriteComponent.mesh);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // configure click action
        pickableComponent.addEventListener('onclick', this, fnOnClick);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(drawableComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    
    return Button;
});