define(["../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

    // CLASS TerminalWireAnchor
    TerminalWireAnchor.prototype = Object.create(Entity.prototype);
    TerminalWireAnchor.prototype.constructor = TerminalWireAnchor;
    function TerminalWireAnchor(offsetPosition, parentElement) {

        Entity.call(this);

        this.offset = offsetPosition;
        this.parentElement = parentElement;

        // pose
        var parentElementPose = this.parentElement.getComponent($.PoseComponent);
        var poseComponent = new $.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure parentElement position following
        parentElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToCircuitElement);
        parentElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToCircuitElement);

        // compose entity
        this.addComponent(poseComponent);

        // initialize the terminal's location (must come after the PoseComponent has been added to the entity)
        this.addEventListener('oninit', this, this.__setPoseRelativeToCircuitElement);
    };
    TerminalWireAnchor.prototype.__setPoseRelativeToCircuitElement = function () {
        var parentElementPose = this.parentElement.getComponent($.PoseComponent)
        var position = parentElementPose.position;
        var orientation = parentElementPose.orientation;
        var templateX = this.offset.x;
        var templateY = this.offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
        poseComponent.orientation = orientation;
    };

    return TerminalWireAnchor;
});