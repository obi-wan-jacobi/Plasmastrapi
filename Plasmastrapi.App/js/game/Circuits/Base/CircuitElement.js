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
        $PickableTraits.Placeable.call(pickableComponent);
        $PickableTraits.Trashable.call(pickableComponent);
    };
    // private methods
    CircuitElement.prototype.__ondestroy = function () {
        this.__engine.circuitElementContainer.remove(this);
    };
    // public methods
    CircuitElement.prototype.injectEngine = function (engine) {
        BaseElement.prototype.injectEngine.call(this, engine);
        this.__engine.circuitElementContainer.add(this);
    };
    CircuitElement.prototype.updateState = function (inputState) {
        throw new Error(this.constructor.name + ':updateState - This method must be overridden!');
    };
    
    return CircuitElement;
});