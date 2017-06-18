define(['wire-element', 'input-terminal', 'output-terminal', 'line-component'],
function (WireElement, InputTerminal, OutputTerminal, LineComponent) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        validator.validateType(this, outputTerminal, OutputTerminal);
        validator.validateType(this, inputTerminal, InputTerminal);

        WireElement.call(this, outputTerminal, inputTerminal);

        // initialize terminal listeners and state
        this.outputTerminal = outputTerminal;
        this.inputTerminal = inputTerminal;

        this.inputTerminal.addEventListener('ondestroy', this, this.destroy);
        this.outputTerminal.addEventListener('ondestroy', this, this.destroy);
        this.outputTerminal.addEventListener('onstatechange', this, this.__updateState);

        this.inputTerminal.addConnection(this.outputTerminal);
        this.__updateState();
    };
    // private methods
    Wire.prototype.__updateState = function () {
        var lineComponent = this.getComponent(LineComponent);
        var displayLayer = config.Wire.displayLayer;
        var lineWidth = config.Wire.poweredLineWidth;
        if (!this.outputTerminal.isPowered) {
            lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.noPowerLineColour, lineWidth);
        } else if (this.outputTerminal.isHigh) {
            lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.highLineColour, lineWidth);
        } else if (this.outputTerminal.isLow) {
            lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.lowLineColour, lineWidth);
        }
    };
    Wire.prototype.__ondestroy = function () {
        this.inputTerminal.removeConnection(this.outputTerminal);
        this.__engine.wireContainer.remove(this);
    };
    // public methods
    Wire.prototype.injectEngine = function (engine) {
        WireElement.prototype.injectEngine.call(this, engine);
        this.__engine.wireContainer.add(this);
    };

    return Wire;
});