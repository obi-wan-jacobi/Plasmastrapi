define([
    "./BaseElement",
    "../../../engine/Namespaces/$Components",
    "../../Namespaces/$Compatibility"],
function (BaseElement, $, $Compatibility) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(BaseElement.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        BaseElement.call(this, x, y);

        // tool compatibility
        $Compatibility.Placeable.call(this);
        $Compatibility.Trashable.call(this);
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