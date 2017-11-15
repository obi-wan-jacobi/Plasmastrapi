define(['factory', 'utils', 'circuits-config'],
    function (Factory, utils, config) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory(engine) {
        Factory.call(this, engine, 'wire-element', 'wire-container');
        this.__displaySettingsFactory = null;
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
        this.__labController = null;
        this.__cursorController = null;
    };
    // private methods
    WireFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
    };
    // public methods
    WireFactory.prototype.create = function (wireElementString, tailElement, headElement) {
        utils.validator.validateClassType(this, wireElementString, this.__typeString);
        var isThisConnectionBeingDuplicated = this.__container.forEach(function (wire) {
            if (wire.outputTerminal === tailElement && wire.inputTerminal === headElement) {
                return true;
            }
        }, this);
        if (isThisConnectionBeingDuplicated) {
            return;
        } 
        var wireElement = this.__circuitElementFactory.create(wireElementString);
        // add components
        wireElement.addComponent(this.__componentFactory.create('polygon-component'));
        var displayArgs = [config.Wire.displayLayer, config.Wire.noPowerLineColour, config.Wire.poweredLineWidth];
        var lineDisplaySettings = this.__displaySettingsFactory.create('line-display-settings', displayArgs);
        var lineComponentArgs = [tailElement.getComponent('pose-component'), headElement.getComponent('pose-component'), lineDisplaySettings];
        var lineComponent = this.__componentFactory.create('line-component', lineComponentArgs);
        wireElement.addComponent(lineComponent);
        wireElement.connectTail(tailElement);
        wireElement.connectHead(headElement);
        if (utils.validator.isInstanceOfType(wireElement, 'wire')) {
            // *** closures ***
            var pickComponent = this.__componentFactory.create('pick-component');
            var labController = this.__labController;
            var cursorController = this.__cursorController;
            function setTarget() {
                labController.setTarget(wireElement);
            };
            function setHoverColour() {
                var displaySettings = wireElement.getComponent('line-component').getDisplaySettings();
                displaySettings.strokeStyle = 'red';
                cursorController.setPointer();
            };
            function revertHoverColour() {
                var displaySettings = wireElement.getComponent('line-component').getDisplaySettings();
                displaySettings.strokeStyle = config.Wire.noPowerLineColour;
                cursorController.setDefault();
            };
            pickComponent.addEventListener('onpick', wireElement, setTarget);
            pickComponent.addEventListener('onmouseenter', wireElement, setHoverColour);
            pickComponent.addEventListener('onmouseleave', wireElement, revertHoverColour);
            wireElement.addComponent(pickComponent);
            this.__container.add(wireElement);
        }
        return wireElement;
    };
    WireFactory.prototype.createAnchorWiredToTerminal = function (terminal, /* optional */ wireAnchorPositionOffset) {
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        var wireAnchor = this.__circuitElementFactory.create('wire-anchor');
        if (wireAnchorPositionOffset) {
            utils.validator.validateInstanceType(this, wireAnchorPositionOffset, 'position');
            wireAnchor.follow(terminal, wireAnchorPositionOffset);
        }
        this.create('terminal-wire', wireAnchor, terminal);
        return wireAnchor;
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