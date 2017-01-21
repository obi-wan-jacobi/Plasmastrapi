define(["../../../engine/Objects/Entity"], function (Entity) {

    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement() {
        Entity.call(this);
    };

    return UIElement;
});