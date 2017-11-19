define(['extended-factory', 'utils', 'game-config'],
function (ExtendedFactory, utils, config) {

    AugmentedWireFactory.prototype = Object.create(ExtendedFactory.prototype);
    AugmentedWireFactory.prototype.constructor = AugmentedWireFactory;
    function AugmentedWireFactory(engine) {
        ExtendedFactory.call(this, engine, 'wire-factory', 'wire-element');
        this.__displaySettingsFactory = null;
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
        this.__labController = null;
        this.__cursorController = null;
        this.__assetMap = null;
    };
    // private methods
    AugmentedWireFactory.prototype.__oninit = function () {
        ExtendedFactory.prototype.__oninit.call(this);
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    AugmentedWireFactory.prototype.create = function (wireElementString, args) {
        var wireElement = ExtendedFactory.prototype.create.call(this, wireElementString, args);
        if (!wireElement) {
            return;
        }
        var tailElement = args[0];
        var headElement = args[1];
        // add components
        wireElement.addComponent(this.__componentFactory.create('pose-component'));
        wireElement.addComponent(this.__componentFactory.create('polygon-component'));
        var displayArgs = [config.Wire.displayLayer, config.Wire.noPowerLineColour, config.Wire.poweredLineWidth];
        var lineDisplaySettings = this.__displaySettingsFactory.create('line-display-settings', displayArgs);
        var lineComponentArgs = [tailElement.getComponent('pose-component'), headElement.getComponent('pose-component'), lineDisplaySettings];
        var lineComponent = this.__componentFactory.create('line-component', lineComponentArgs);
        wireElement.addComponent(lineComponent);
        function updateStrokeStyle(incomingState) {
            if (incomingState === 1) {
                this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.highLineColour;
            } else if (incomingState === 0) {
                this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.lowPowerLineColour;
            } else {
                this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.noPowerLineColour;
            }
        };
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
                updateStrokeStyle.call(wireElement, wireElement.outputTerminal.getState());
                cursorController.setDefault();
            };
            pickComponent.addEventListener('onpick', wireElement, setTarget);
            pickComponent.addEventListener('onmouseenter', wireElement, setHoverColour);
            pickComponent.addEventListener('onmouseleave', wireElement, revertHoverColour);
            wireElement.addEventListener('onstatechange', wireElement, updateStrokeStyle);
            wireElement.addComponent(pickComponent);
        } else if (utils.validator.isInstanceOfType(tailElement, 'output-terminal')) {
            updateStrokeStyle.call(wireElement, tailElement.getState());
        }
        wireElement.connectTail(tailElement);
        wireElement.connectHead(headElement);
        return wireElement;
    };
    AugmentedWireFactory.prototype.createAnchorWiredToTerminal = function (terminal, /* optional */ wireAnchorPositionOffset) {
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        var wireAnchor = this.__circuitElementFactory.create('wire-anchor');
        wireAnchor.addComponent(this.__componentFactory.create('pose-component'));
        if (wireAnchorPositionOffset) {
            utils.validator.validateInstanceType(this, wireAnchorPositionOffset, 'position');
            wireAnchor.follow(terminal, wireAnchorPositionOffset);
        }
        wireAnchor.addDependency(terminal);
        this.create('terminal-wire', [terminal, wireAnchor]);
        return wireAnchor;
    };

    return AugmentedWireFactory;
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