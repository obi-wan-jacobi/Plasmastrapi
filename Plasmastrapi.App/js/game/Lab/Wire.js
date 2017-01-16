define(["./LabElement"], function (LabElement) {

    // CLASS Wire
    Wire.prototype = Object.create(LabElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(tailObject, headObject) {

        LabElement.call(this);

        var lineComponent = new Components.LineComponent(
            tailObject.getComponent(Components.PoseComponent),
            headObject.getComponent(Components.PoseComponent),
            new Graphics.LineStyleTemplate('#FFFFFF', 2)
        );

        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.GAMEENTITIES);

        this.addComponent(lineComponent);
        this.addComponent(drawableComponent);

    };

    return Wire;
});