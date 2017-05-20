define([
    // Base
    'base-element',
    // Configs
    'placeable',
    'trashable'
],
function (BaseElement, Placeable, Trashable) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(BaseElement.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement(x, y) {
        // inherits from
        BaseElement.call(this, x, y);

        // tool compatibility
        Placeable.call(this);
        Trashable.call(this);
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