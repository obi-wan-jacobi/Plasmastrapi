define(["../../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Graphics", "../../Tools/Compatibility/$Compatibility"],
function (Entity, $, Graphics, $Compatibility) {

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
        // tool compatibility
        $Compatibility.Selectable.call(this);
        $Compatibility.Cuttable.call(this);
    };

    return WireElement;
});