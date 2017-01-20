define(function () {

    // CLASS Terminal
    Terminal.prototype = Object.create(CircuitElementFeature.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(offsetPosition, circuitElement) {

        CircuitElementFeature.call(this);

        this.offset = offsetPosition;
        this.circuitElement = circuitElement;

        // pose
        var circuitElementPose = this.circuitElement.getComponent(Components.PoseComponent);
        var poseComponent = new Components.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure circuitElement position following
        circuitElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToCircuitElement);
        circuitElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToCircuitElement);

        // entity is pickable
        var collisionBounds = new Geometry.Rectangle(20, 20);
        var mesh = new Geometry.Mesh(collisionBounds);
        var meshComponent = new Components.MeshComponent(mesh);
        var pickableComponent = new Components.PickableComponent(meshComponent);

        // configure pick action
        pickableComponent.addEventListener('onpick', this, this.__onpick);

        // configure hover actions
        pickableComponent.addEventListener('onselect', this, this.__onselect);
        pickableComponent.addEventListener('ondeselect', this, this.__ondeselect);
        pickableComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickableComponent.addEventListener('onmouseleave', this, this.__onmouseleave);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        // initialize the terminal's location (must come after the PoseComponent has been added to the entity)
        this.addEventListener('oninit', this, this.__setPoseRelativeToCircuitElement);
    };
    Terminal.prototype.__setPoseRelativeToCircuitElement = function () {
        var circuitElementPose = this.circuitElement.getComponent(Components.PoseComponent)
        var position = circuitElementPose.position;
        var orientation = circuitElementPose.orientation;
        var templateX = this.offset.x;
        var templateY = this.offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent(Components.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
        poseComponent.orientation = orientation;
    };
    Terminal.prototype.__onselect = function () {
        var spriteComponent = this.getComponent(Components.SpriteComponent);
        spriteComponent.setFrame(2);
    };
    Terminal.prototype.__ondeselect = function () {
        var spriteComponent = this.getComponent(Components.SpriteComponent);
        if (this instanceof OutputTerminal) {
            spriteComponent.setFrame(0);
        } else if (this instanceof InputTerminal) {
            spriteComponent.setFrame(1);
        }
    };
    Terminal.prototype.__onmouseenter = function () {
        var spriteComponent = this.getComponent(Components.SpriteComponent);
        spriteComponent.setFrame(2);
    };
    Terminal.prototype.__onmouseleave = function () {
        var spriteComponent = this.getComponent(Components.SpriteComponent);
        if (this instanceof OutputTerminal) {
            spriteComponent.setFrame(0);
        } else if (this instanceof InputTerminal) {
            spriteComponent.setFrame(1);
        }
    };
    Terminal.prototype.__onpick = function () {
        toolController.equip(tools.wireTool, this);
    };
    
    return Terminal;
});