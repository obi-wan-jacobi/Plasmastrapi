define(["../Base/WireElement", "../../../engine/Namespaces/$Components", "../../../engine/Namespaces/$Data", "../Terminals/InputTerminal", "../Terminals/OutputTerminal",
"../../Namespaces/$PickableTraits"],
function (WireElement, $, $Data, InputTerminal, OutputTerminal, $PickableTraits) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        if (!(outputTerminal instanceof OutputTerminal) || !(inputTerminal instanceof InputTerminal)) {
            throw new Error(this.constructor.name + ":constructor - output and input terminal arguments must be of their corresponding types!");
        }

        WireElement.call(this, outputTerminal, inputTerminal);

        outputTerminal.addEventListener('ondestroy', this, this.destroy);
        inputTerminal.addEventListener('ondestroy', this, this.destroy);

        var lineComponent = this.getComponent($.LineComponent);
        lineComponent.collisionOptions = new $Data.Physics.LineCollisionOptions(25, 0.95);
        lineComponent.addEventListener('onpositionchange', this, this.__updateMeshComponent);
        lineComponent.addEventListener('onorientationchange', this, this.__updateMeshComponent);

        var poseComponent = new $.PoseComponent(lineComponent.position, lineComponent.orientation);

        var meshDisplayOptions = new $Data.Graphics.MeshDisplayOptions('ondrawgameentities')
        var meshComponent = new $.MeshComponent(lineComponent.mesh, meshDisplayOptions);

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