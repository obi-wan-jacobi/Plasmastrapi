define(['circuit-element', 'line-component', 'pose-component'],
function (CircuitElement, LineComponent, PoseComponent) {

    // CLASS WireElement
    WireElement.prototype = Object.create(CircuitElement.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement(tailObject, headObject) {
        CircuitElement.call(this);
        var lineComponent = new LineComponent(
            tailObject.getComponent(PoseComponent),
            headObject.getComponent(PoseComponent)
        );
        this.addComponent(lineComponent);
    };

    return WireElement;
});