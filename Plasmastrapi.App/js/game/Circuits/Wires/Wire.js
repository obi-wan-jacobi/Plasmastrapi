define(["../Base/WireElement", "../../../engine/Namespaces/$Components", "../../../engine/Data/Physics", "../Terminals/InputTerminal", "../Terminals/OutputTerminal",
"../../Tools/PickableTraits/$PickableTraits"],
function (WireElement, $, Physics, InputTerminal, OutputTerminal, $PickableTraits) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        if (!(outputTerminal instanceof OutputTerminal) || !(inputTerminal instanceof InputTerminal)) {
            throw new Error(this.constructor.name + ":constructor - output and input terminal arguments must be of their corresponding types!");
        }

        WireElement.call(this, outputTerminal, inputTerminal);

        var lineComponent = this.getComponent($.LineComponent);
        lineComponent.collisionOptions = new Physics.LineCollisionOptions(20, 0.85);
        lineComponent.addEventListener('onpositionchange', this, this.__updateMeshComponent);
        lineComponent.addEventListener('onorientationchange', this, this.__updateMeshComponent);

        var poseComponent = new $.PoseComponent(lineComponent.position, lineComponent.orientation);
        var meshComponent = new $.MeshComponent(lineComponent.mesh);
        var pickableComponent = new $.PickableComponent();

        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        // tool compatibility
        $PickableTraits.Cuttable.call(pickableComponent);
    };
    Wire.prototype.__updateMeshComponent = function () {
        var lineComponent = this.getComponent($.LineComponent);
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = lineComponent.position;
        poseComponent.orientation = lineComponent.orientation;
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = lineComponent.mesh;
    };

    return Wire;
});