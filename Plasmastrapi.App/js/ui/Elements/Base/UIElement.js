define(['entity', 'utils'],
function (Entity, utils) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(engine) {
        utils.validator.validateInstanceType(this, engine, 'engine');
        Entity.call(this);
        this.__engine = engine;
        this.__engine.getFactory('decorator-factory').create('easy-composition-decorator', this);
    };
    UIElement.prototype.contains = function (entity) {
        utils.validator.validateInstanceType(this, entity, 'entity');
        var position = entity.getComponent('pose-component')
            .getHandle()
            .getPosition();
        return this.getComponent('polygon-component')
            .getHandle()
            .checkPointCollision(position);
    };

    return UIElement;
});