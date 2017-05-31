define([
    // Base
    'entity',
    // Components
    'line-component',
    'pose-component',
    // Data
    'line-display-options',
    // Configs
    'circuits-config'
],
function (Entity, LineComponent, PoseComponent, LineDisplayOptions, config) {

    // CLASS WireElement
    WireElement.prototype = Object.create(Entity.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement(tailObject, headObject) {
        Entity.call(this);
        var lineComponent = new LineComponent(
            tailObject.getComponent(PoseComponent),
            headObject.getComponent(PoseComponent),
            new Graphics.LineDisplayOptions(
                config.WireElement.displayLayer,
                config.WireElement.wireColour,
                config.WireElement.lineThickness
            )
        );
        this.addComponent(lineComponent);
    };

    return WireElement;
});