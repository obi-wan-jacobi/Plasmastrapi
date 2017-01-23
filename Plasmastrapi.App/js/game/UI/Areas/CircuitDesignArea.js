define(["./Area",
        "../../../engine/Components/$Components",
        "../../../engine/Data/Geometry",
        "../../../engine/Data/Graphics"
    ],
    function (Area, $, Geometry, Graphics) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, width, height) {
        Area.call(this);
    };
    CircuitDesignArea.prototype.__oninit = function () {
        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // image
        var imageStyleTemplate = new Graphics.ImageDisplayOptions(this.__engine.drawSystem.DISPLAYLAYERS.GAMEBACKGROUND, 115, 63, width / 2, height / 2, width, height);
        var imageComponent = new $.ImageComponent(this.image, imageStyleTemplate);

        // drawable on game background layer
        var drawableComponent = new $.DrawableComponent();

        // configure image as collision mesh
        var meshComponent = new $.MeshComponent(imageComponent.mesh);

        // design area is pickable
        var pickableComponent = new $.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(imageComponent);
        this.addComponent(drawableComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };
    
    return CircuitDesignArea;
});