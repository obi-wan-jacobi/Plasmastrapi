define(function () {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(ToolbarElement.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementClass) {

        ToolbarElement.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new Components.PoseComponent(position, 0);

        // sprite
        var sprite = circuitElementClass.prototype.sprite;
        var spriteComponent = new Components.SpriteComponent(sprite);

        // configure sprite as graphic
        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.UIENTITIES);

        // configure sprite as collision mesh
        var meshComponent = new Components.MeshComponent(spriteComponent.mesh);

        // button is pickable
        var pickableComponent = new Components.PickableComponent();

        // configure pick action
        pickableComponent.addEventListener('onpick', this, function () {
            var element = new circuitElementClass(position.x, position.y);
            // place spawned element
            toolController.equip(tools.placingTool, element);
        });

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
        this.addComponent(drawableComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    
    return SpawnerButton;
});