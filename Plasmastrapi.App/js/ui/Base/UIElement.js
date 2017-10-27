define(['entity'],
function (Entity) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(game) {
        Entity.call(this);
    };

    return UIElement;
});