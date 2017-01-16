define(["./LabElement"], function (LabElement) {

    // CLASS TerminalWireAnchor
    TerminalWireAnchor.prototype = Object.create(LabElement.prototype);
    TerminalWireAnchor.prototype.constructor = TerminalWireAnchor;
    function TerminalWireAnchor(offsetPosition, circuitElement) {

        LabElement.call(this);

        this.offset = offsetPosition;
        this.circuitElement = circuitElement;

        // pose
        var circuitElementPose = this.circuitElement.getComponent(Components.PoseComponent);
        var poseComponent = new Components.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure circuitElement position following
        circuitElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToCircuitElement);
        circuitElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToCircuitElement);

        // compose entity
        this.addComponent(poseComponent);

        // initialize the terminal's location (must come after the PoseComponent has been added to the entity)
        this.addEventListener('oninit', this, this.__setPoseRelativeToCircuitElement);
    };
    TerminalWireAnchor.prototype.__setPoseRelativeToCircuitElement = function () {
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

    return TerminalWireAnchor;
});