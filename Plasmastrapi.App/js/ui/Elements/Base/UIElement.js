define(['entity', 'validator'],
function (Entity, validator) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(engine) {
        Entity.call(this);
        this.__engine = engine;
    };
    // public methods
    UIElement.prototype.contains = function (entity) {
        validator.validateInstanceType(this, entity, 'entity');
        var position = entity.getComponent('pose-component')
            .getHandle()
            .getPosition();
        return this.getComponent('polygon-component')
            .getHandle()
            .checkPointCollision(position);
    };

    return UIElement;
});