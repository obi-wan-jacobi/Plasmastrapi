define(["../Base/WireElement", "../../../engine/Components/$Components", "../../../engine/Data/Graphics"], function (WireElement, $, Graphics) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(tailObject, headObject) {

        WireElement.call(this);

        var lineComponent = new $.LineComponent(
            tailObject.getComponent($.PoseComponent),
            headObject.getComponent($.PoseComponent),
            new Graphics.LineDisplayOptions('ondrawgameentities', '#FFFFFF', 2)
        );

        lineComponent.addEventListener('onpositionchange', this, this.__updateMeshComponent);
        lineComponent.addEventListener('onorientationchange', this, this.__updateMeshComponent);

        this.addComponent(lineComponent);
    };
    Wire.prototype.__updateMeshComponent = function () {
        var lineComponent = this.getComponent($.LineComponent);
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = lineComponent.mesh;
    };

    return Wire;
});