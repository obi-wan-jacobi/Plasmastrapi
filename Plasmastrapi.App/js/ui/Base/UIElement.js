define(['entity', 'component-factory'],
function (Entity, ComponentFactory) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(game) {
        Entity.call(this);

    };
    UIElement.addComponentFromPrimitive

    return UIElement;
});