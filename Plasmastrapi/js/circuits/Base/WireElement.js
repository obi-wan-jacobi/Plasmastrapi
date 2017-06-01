define([
    // Base
    'entity',
    // Components
    'line-component',
    'pose-component',
    // Data
    'line-display-settings',
    // Configs
    'circuits-config'
],
function (Entity, LineComponent, PoseComponent, LineDisplaySettings, config) {

    // CLASS WireElement
    WireElement.prototype = Object.create(Entity.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement(tailObject, headObject) {
        Entity.call(this);
        var lineComponent = new LineComponent(
            tailObject.getComponent(PoseComponent),
            headObject.getComponent(PoseComponent),
            new LineDisplaySettings(
                config.WireElement.displayLayer,
                config.WireElement.wireColour,
                config.WireElement.lineThickness
            )
        );
        this.addComponent(lineComponent);
    };

    return WireElement;
});