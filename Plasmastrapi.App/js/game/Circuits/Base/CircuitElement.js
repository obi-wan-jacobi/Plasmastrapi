define([
    "./BaseElement",
    "../../../engine/Namespaces/$Components",
    "../../Namespaces/$PickableTraits"],
function (BaseElement, $, $PickableTraits) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(BaseElement.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        BaseElement.call(this, x, y);

        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.Trashable.call(pickableComponent);
    };
    
    return CircuitElement;
});