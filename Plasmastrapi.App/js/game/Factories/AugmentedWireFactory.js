define(['factory', 'utils', 'game-config'],
function (Factory, utils, config) {

    AugmentedWireFactory.prototype = Object.create(Factory.prototype);
    AugmentedWireFactory.prototype.constructor = AugmentedWireFactory;
    function AugmentedWireFactory(engine) {
        Factory.call(this, engine, 'wire-element');
        this.__wireFactory = engine.getFactory('wire-factory');
        this.__terminalWireFactory = engine.getFactory('terminal-wire-factory');
        this.__displaySettingsFactory = engine.getFactory('display-settings-factory');
        this.__componentFactory = engine.getFactory('component-factory');
        this.__primitiveFactory = engine.getFactory('primitive-factory');
        this.__circuitElementFactory = engine.getFactory('circuit-element-factory');
        this.__labController = engine.getController('lab-controller');
        this.__cursorController = engine.getController('cursor-controller');
    };
    // public methods
    AugmentedWireFactory.prototype.create = function (args) {
        var wireElement = this.__wireFactory.create(args);
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
        wireElement.connectTail(tailElement);
        wireElement.connectHead(headElement);
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
        wireElement.addEventListener('onstatechange', wireElement, updateStrokeStyle.bind(this));
        pickComponent.addEventListener('onselect', wireElement, setHoverColour);
        pickComponent.addEventListener('ondeselect', wireElement, revertHoverColour);
        wireElement.addComponent(pickComponent);
        pickComponent.disable();
        return wireElement;
    };
    AugmentedWireFactory.prototype.createAnchorWiredToTerminal = function (terminal, wireAnchorPositionOffset) {

        wireAnchorPositionOffset = wireAnchorPositionOffset || this.__primitiveFactory.create('position', [0, 0]);

        utils.validator.validateInstanceType(this, terminal, 'terminal');
        utils.validator.validateInstanceType(this, wireAnchorPositionOffset, 'position');

        var wireAnchor = this.__circuitElementFactory.create('wire-anchor');
        wireAnchor.addComponent(this.__componentFactory.create('pose-component'));
        wireAnchor.getComponent('pose-component').follow(terminal.getComponent('pose-component'), wireAnchorPositionOffset);
        wireAnchor.addDependency(terminal);

        var terminalWire = this.__terminalWireFactory.create([terminal, wireAnchor]);
        var tailElement = terminal;
        var headElement = wireAnchor;
        // add components
        terminalWire.addComponent(this.__componentFactory.create('pose-component'));
        terminalWire.addComponent(this.__componentFactory.create('polygon-component'));
        var displayArgs = [config.Wire.displayLayer, config.Wire.noPowerLineColour, config.Wire.poweredLineWidth];
        var lineDisplaySettings = this.__displaySettingsFactory.create('line-display-settings', displayArgs);
        var lineComponentArgs = [tailElement.getComponent('pose-component'), headElement.getComponent('pose-component'), lineDisplaySettings];
        var lineComponent = this.__componentFactory.create('line-component', lineComponentArgs);
        terminalWire.addComponent(lineComponent);
        terminalWire.connectTail(tailElement);
        terminalWire.connectHead(headElement);
        if (utils.validator.isInstanceOfType(tailElement, 'output-terminal')) {
            updateStrokeStyle.call(terminalWire, tailElement.getState());
        }
        return wireAnchor;
    };
    AugmentedWireFactory.prototype.getContainer = function () {
        return this.__wireFactory.getContainer();
    };

    function updateStrokeStyle(incomingState) {
        if (incomingState === 1) {
            this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.highLineColour;
        } else if (incomingState === 0) {
            this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.lowLineColour;
        } else {
            this.getComponent('line-component').getDisplaySettings().strokeStyle = config.Wire.noPowerLineColour;
        }
    };

    return AugmentedWireFactory;
});