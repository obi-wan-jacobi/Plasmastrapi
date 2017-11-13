define(['ui-element', 'utils'],
function (UIElement, utils) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(engine) {
        UIElement.call(this, engine);
    };
    Panel.prototype.confine = function (entity) {
        utils.validator.validateInstanceType(this, entity, 'entity');
        var entityPosition = entity.getComponent('pose-component').getHandle().getPosition();
        var panelPosition = this.getComponent('pose-component').getHandle().getPosition();
        var panelRectangle = this.getComponent('polygon-component').getData();
        var panelWidth = panelRectangle.getWidth();
        var panelHeight = panelRectangle.getHeight();
        var minX = panelPosition.x - panelWidth / 2, maxX = panelPosition.x + panelWidth / 2,
            minY = panelPosition.y - panelHeight / 2, maxY = panelPosition.y + panelHeight / 2;
        var boundedX = entityPosition.x < minX ? minX : entityPosition.x > maxX ? maxX : entityPosition.x;
        var boundedY = entityPosition.y < minY ? minY : entityPosition.y > maxY ? maxY : entityPosition.y;
        var newPosition = this.__engine.getFactory('primitive-factory').create('position', [boundedX, boundedY]);
        entity.getComponent('pose-component').setData(newPosition);
    };

    return Panel;
});