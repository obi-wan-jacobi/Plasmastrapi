define(['entity', 'validator'],
function (Entity, validator) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(game) {
        Entity.call(this);
    };
    // public methods
    UIElement.prototype.contains = function (entity) {
        validator.validateInstanceType(this, entity, Entity);
        var position = entity.getComponent('pose-component')
            .getHandle()
            .getPosition();
        return this.getComponent('polygon-component')
            .getHandle()
            .checkPointCollision(position);
    };

    return UIElement;
});