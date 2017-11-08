define(['factory', 'wire-element', 'wire-anchor', 'terminal-wire', 'terminal', 'line-display-settings', 'utils', 'circuits-config'],
    function (Factory, WireElement, WireAnchor, TerminalWire, Terminal, LineDisplaySettings, utils, config) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(game) {
        Factory.call(this, WireElement);
        this.__componentFactory = game.getFactory('component-factory');
        this.__circuitElementFactory = game.getFactory('circuit-element-factory');
    };
    // public methods
    WireFactory.prototype.create = function (WireElementType, tailElement, headElement) {
        utils.validator.validateClassType(this, WireElementType, WireElement);
        var wireElement = this.__circuitElementFactory.create(WireElementType);
        // add components
        var displayLayer = config.Wire.displayLayer;
        var lineWidth = config.Wire.poweredLineWidth;
        var lineDisplaySettings = new LineDisplaySettings(displayLayer, config.Wire.noPowerLineColour, lineWidth);
        var lineComponentArgs = [tailElement.getComponent('pose-component'), headElement.getComponent('pose-component'), lineDisplaySettings];
        var lineComponent = this.__componentFactory.create('line-component', lineComponentArgs);
        wireElement.addComponent(lineComponent);
        wireElement.addDependency(tailElement);
        wireElement.addDependency(headElement);
        return wireElement;
    };
    WireFactory.prototype.createTerminalWire = function (terminal, wireAnchorPositionOffset) {
        utils.validator.validateInstanceType(this, terminal, Terminal);
        var wireAnchor = this.__circuitElementFactory.create(WireAnchor);
        wireAnchor.follow(terminal, wireAnchorPositionOffset);
        return this.create(TerminalWire, wireAnchor, terminal);
    };

    return WireFactory;
});

/*
Wire.prototype.__updateState = function () {
    var lineComponent = this.getComponent('line-component');
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