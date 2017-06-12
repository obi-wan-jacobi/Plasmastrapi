define(['base-element'],
function (BaseElement) {

    // CLASS CircuitElement
    CircuitElement.prototype = Object.create(BaseElement.prototype);
    CircuitElement.prototype.constructor = CircuitElement;
    function CircuitElement() {
        // inherits from
        BaseElement.call(this);
        this.__inputs = [];
    };
    // private methods
    CircuitElement.prototype.__ondestroy = function () {
        this.__engine.circuitElementContainer.remove(this);
    };
    CircuitElement.prototype.__getInputConnections = function () {
        var connections = [];
        for (var input in this.__inputs) {
            connections.push(input.getConnections());
        }
        return connections;
    };
    // public methods
    CircuitElement.prototype.attachInput = function (inputTerminal) {
        this.__inputs.push(inputTerminal);
    };
    CircuitElement.prototype.injectEngine = function (engine) {
        BaseElement.prototype.injectEngine.call(this, engine);
        this.__engine.circuitElementContainer.add(this);
    };
    CircuitElement.prototype.updateState = function (inputState) {
        throw new Error(this.constructor.name + ':updateState - This method must be overridden!');
    };
    
    return CircuitElement;
});