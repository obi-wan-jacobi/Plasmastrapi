define([
    // Base
    'entity',
    // Components
    'pose-component',
    // Data
    'graphics',
    // Configs
    'game-config'
],
function (Entity, PoseComponent, Graphics, config) {

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