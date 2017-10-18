define(['entity', 'line-component', 'pose-component'],
function (Entity, LineComponent, PoseComponent) {

    // CLASS WireElement
    WireElement.prototype = Object.create(Entity.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement(tailObject, headObject) {
        Entity.call(this);
        var lineComponent = new LineComponent(
            tailObject.getComponent(PoseComponent),
            headObject.getComponent(PoseComponent)
        );
        this.addComponent(lineComponent);
    };

    return WireElement;
});