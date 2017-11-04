define(['factory', 'circuit-element-factory', 'wire-element', 'component-factory', 'wire-anchor', 'terminal-wire', 'terminal', 'line-component', 'pose-component', 'line-display-settings', 'utils', 'circuits-config'],
    function (Factory, CircuitElementFactory, WireElement, ComponentFactory, WireAnchor, TerminalWire, Terminal, LineComponent, PoseComponent, LineDisplaySettings, utils, config) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(game) {
        Factory.call(this, WireElement);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
    };
    // public methods
    WireFactory.prototype.create = function (WireElementType, tailElement, headElement) {
        utils.validator.validateClassType(this, WireElementType, WireElement);
        var wireElement = this.__circuitElementFactory.create(WireElementType);
        // add components
        var displayLayer = config.Wire.displayLayer;
        var lineWidth = config.Wire.poweredLineWidth;
        var lineDisplaySettings = new LineDisplaySettings(displayLayer, config.Wire.noPowerLineColour, lineWidth);
        var lineComponentArgs = [tailElement.getComponent(PoseComponent), headElement.getComponent(PoseComponent), lineDisplaySettings];
        var lineComponent = this.__componentFactory.create(LineComponent, lineComponentArgs);
        wireElement.addComponent(lineComponent);
        return wireElement;
    };
    WireFactory.prototype.createTerminalWire = function (terminal, wireAnchorPositionOffset) {
        utils.validator.validateInstanceType(this, terminal, Terminal);
        var wireAnchor = this.__circuitElementFactory.create(WireAnchor);
        wireAnchor.addParent(terminal);
        wireAnchor.follow(terminal, wireAnchorPositionOffset);
        return this.create(TerminalWire, wireAnchor, terminal);
    };

    return WireFactory;
});

/*
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
*/