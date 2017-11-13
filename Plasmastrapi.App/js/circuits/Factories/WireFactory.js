define(['factory', 'line-display-settings', 'utils', 'circuits-config'],
    function (Factory, LineDisplaySettings, utils, config) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
    };
    // private methods
    WireFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
    };
    // public methods
    WireFactory.prototype.create = function (wireElementString, tailElement, headElement) {
        utils.validator.validateClassType(this, wireElementString, 'wire-element');
        var wireElement = this.__circuitElementFactory.create(wireElementString);
        // add components
        wireElement.addComponent(this.__componentFactory.create('polygon-component'));
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
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        utils.validator.validateInstanceType(this, wireAnchorPositionOffset, 'position');
        var wireAnchor = this.__circuitElementFactory.create('wire-anchor');
        wireAnchor.follow(terminal, wireAnchorPositionOffset);
        return this.create('terminal-wire', wireAnchor, terminal);
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