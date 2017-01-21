define(function () {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(LabElement.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, width, height) {
        // inherits from
        LabElement.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new Components.PoseComponent(position, 0);

        // image
        var imageStyleTemplate = new Graphics.ImageStyleTemplate(115, 63, width / 2, height / 2, width, height);
        var imageComponent = new Components.ImageComponent(this.image, imageStyleTemplate);

        // drawable on game background layer
        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.GAMEBACKGROUND);

        // configure image as collision mesh
        var meshComponent = new Components.MeshComponent(imageComponent.mesh);

        // design area is pickable
        var pickableComponent = new Components.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(imageComponent);
        this.addComponent(drawableComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    
    return CircuitDesignArea;
});