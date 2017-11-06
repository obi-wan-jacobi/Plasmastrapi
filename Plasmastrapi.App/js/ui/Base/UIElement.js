define(['entity', 'pose-component', 'polygon-component', 'validator'],
function (Entity, PoseComponent, PolygonComponent, validator) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(game) {
        Entity.call(this);
    };
    // public methods
    UIElement.prototype.contains = function (entity) {
        validator.validateInstanceType(this, entity, Entity);
        var position = entity.getComponent(PoseComponent)
            .getHandle()
            .getPosition();
        return this.getComponent(PolygonComponent)
            .getHandle()
            .checkPointCollision(position);
    };

    return UIElement;
});