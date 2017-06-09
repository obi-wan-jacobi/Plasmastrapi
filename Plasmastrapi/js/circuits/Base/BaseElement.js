define(['entity'],
function (Entity) {

    // CLASS BaseElement
    BaseElement.prototype = Object.create(Entity.prototype);
    BaseElement.prototype.constructor = BaseElement;
    function BaseElement() {
        Entity.call(this);
    };

    return BaseElement;
});
