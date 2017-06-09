define(['entity'],
function (Entity) {

    // CLASS BaseElement
    BaseElement.prototype = Object.create(Entity.prototype);
    BaseElement.prototype.constructor = BaseElement;
    function BaseElement() {
        Entity.call(this);
    };
    // private methods
    BaseElement.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };

    return BaseElement;
});
