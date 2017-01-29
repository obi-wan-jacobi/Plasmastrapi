define(["../Base/WireElement", "../../../engine/Components/$Components"], function (WireElement, $) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(tailObject, headObject) {
        WireElement.call(this, tailObject, headObject);

        var lineComponent = this.getComponent($LineComponent);
        lineComponent.addEventListener('onpositionchange', this, this.__updateMeshComponent);
        lineComponent.addEventListener('onorientationchange', this, this.__updateMeshComponent);

        var meshComponent = new $.MeshComponent(lineComponent.mesh);
        var pickableComponent = new $.PickableComponent();

        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        // tool compatibility
        $Compatibility.Selectable.call(pickableComponent);
        $Compatibility.Cuttable.call(pickableComponent);
    };
    Wire.prototype.__updateMeshComponent = function () {
        var lineComponent = this.getComponent($.LineComponent);
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = lineComponent.mesh;
    };

    return Wire;
});