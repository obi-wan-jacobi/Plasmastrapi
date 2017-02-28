define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

    // CLASS TerminalWireAnchor
    TerminalWireAnchor.prototype = Object.create(Entity.prototype);
    TerminalWireAnchor.prototype.constructor = TerminalWireAnchor;
    function TerminalWireAnchor(offsetPosition, parentElement) {

        Entity.call(this);

        this.__offset = offsetPosition;
        
        this.addParent(parentElement);

        // pose
        var parentElementPose = this.__parent.getComponent($.PoseComponent);
        var poseComponent = new $.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure parentElement position following
        parentElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToCircuitElement);
        parentElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToCircuitElement);

        // compose entity
        this.addComponent(poseComponent);
    };
    TerminalWireAnchor.prototype.__oninit = function () {
        // initialize position
        this.__setPoseRelativeToCircuitElement();
    };
    TerminalWireAnchor.prototype.__setPoseRelativeToCircuitElement = function () {
        var parentElementPose = this.__parent.getComponent($.PoseComponent)
        var position = parentElementPose.position;
        var orientation = parentElementPose.orientation;
        var templateX = this.__offset.x;
        var templateY = this.__offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
        poseComponent.orientation = orientation;
    };

    return TerminalWireAnchor;
});