define(["../Base/CircuitElement"], function (CircuitElement) {

    // CLASS Wire
    Wire.prototype = Object.create(CircuitElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(tailObject, headObject, lineDisplayOptions) {

        CircuitElement.call(this);

        var lineComponent = new Components.LineComponent(
            tailObject.getComponent(Components.PoseComponent),
            headObject.getComponent(Components.PoseComponent),
            lineDisplayOptionsn //new Graphics.LineStyleTemplate('#FFFFFF', 2)
        );

        this.addComponent(lineComponent);
    };

    return Wire;
});