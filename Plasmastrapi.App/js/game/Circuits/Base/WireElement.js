define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$PickableTraits"],
function (Entity, $, Graphics, $PickableTraits) {

    // CLASS WireElement
    WireElement.prototype = Object.create(Entity.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement(tailObject, headObject) {
        Entity.call(this);
        var lineComponent = new $.LineComponent(
            tailObject.getComponent($.PoseComponent),
            headObject.getComponent($.PoseComponent),
            new Graphics.LineDisplayOptions('ondrawgameentities', '#FFFFFF', 2)
        );
        this.addComponent(lineComponent);
    };

    return WireElement;
});