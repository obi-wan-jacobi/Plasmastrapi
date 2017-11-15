define(['factory', 'input-terminal-container', 'output-terminal-container', 'utils', 'circuits-config'],
function (Factory, InputTerminalContainer, OutputTerminalContainer, utils, config) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
        this.__displaySettingsFactory = null;
        this.__labController = null;
        this.__cursorController = null;
        this.__assetMap = null;
        this.__inputTerminalContainer = new InputTerminalContainer();
        this.__outputTerminalContainer = new OutputTerminalContainer();
    };
    // private methods
    TerminalFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    TerminalFactory.prototype.create = function (terminalString) {
        utils.validator.validateClassType(this, terminalString, 'terminal');
        var terminal = this.__circuitElementFactory.create(terminalString);
        // add components
        terminal.addComponent(this.__componentFactory.createFromPrimitive('rectangle', [24, 24]));
        // configure image
        var image = this.__assetMap.get(terminalString);
        var displayArgs = [config.Terminal.displayLayer, null, null, image.width, image.height, image.width, image.height];
        var displaySettings = this.__displaySettingsFactory.create('image-display-settings', displayArgs);
        terminal.addComponent(this.__componentFactory.createFromDataHandle('image-handle', [image, displaySettings]));
        // configure pick action
        var pickComponent = this.__componentFactory.create('pick-component');
        // *** closures ***
        var labController = this.__labController;
        var cursorController = this.__cursorController;
        var hoverImage = this.__assetMap.get('terminal-hover');
        var hoverDisplayArgs = [config.Terminal.displayLayer, null, null, hoverImage.width, hoverImage.height, hoverImage.width, hoverImage.height];
        var hoverDisplaySettings = this.__displaySettingsFactory.create('image-display-settings', hoverDisplayArgs);
        function setTarget() {
            labController.setTarget(terminal);
        };
        function setWireConnectionCandidate() {
            labController.setWireConnectionCandidate(terminal);
        };
        function setHoverImage() {
            terminal.getComponent('image-component').setData(hoverImage);
            terminal.getComponent('image-component').setDisplaySettings(hoverDisplaySettings);
            cursorController.setPointer();
        };
        function revertHoverImage() {
            terminal.getComponent('image-component').setData(image);
            terminal.getComponent('image-component').setDisplaySettings(displaySettings);
            cursorController.setDefault();
        };
        pickComponent.addEventListener('onpull', terminal, setTarget);
        pickComponent.addEventListener('onpick', terminal, setTarget);
        pickComponent.addEventListener('onpet', terminal, setWireConnectionCandidate);
        pickComponent.addEventListener('onmouseenter', terminal, setHoverImage);
        pickComponent.addEventListener('onmouseleave', terminal, revertHoverImage);
        terminal.addComponent(pickComponent);
        if (utils.validator.isInstanceOfType(terminal, 'input-terminal')) {
            this.__inputTerminalContainer.add(terminal);
        } else if (utils.validator.isInstanceOfType(terminal, 'output-terminal')) {
            this.__outputTerminalContainer.add(terminal);
        }
        return terminal;
    };
    TerminalFactory.prototype.getInputTerminalContainer = function () {
        return this.__inputTerminalContainer;
    };
    TerminalFactory.prototype.getOutputTerminalContainer = function () {
        return this.__outputTerminalContainer;
    };

    return TerminalFactory;
});