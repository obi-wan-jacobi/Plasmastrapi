define(['factory', 'logic-element-container', 'position', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, LogicElementContainer, Position, ImageDisplaySettings, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
        this.__terminalFactory = null;
        this.__wireFactory = null;
        this.__assetMap = null;
        this.__container = new LogicElementContainer();
    };
    // private methods
    LogicElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__terminalFactory = this.__engine.getFactory('terminal-factory');
        this.__wireFactory = this.__engine.getFactory('wire-factory');
        this.__assetMap = this.__engine.getAssetMap();
    };
    LogicElementFactory.prototype.__addTerminal = function (logicElement, terminalString, terminalPositionOffset, wireAnchorPositionOffset) {
        var terminal = this.__terminalFactory.create(terminalString)
        terminal.addParent(logicElement);
        terminal.follow(logicElement, terminalPositionOffset);
        this.__wireFactory.createTerminalWire(terminal, wireAnchorPositionOffset);
    };
    // public methods
    LogicElementFactory.prototype.create = function (logicElementString) {
        utils.validator.validateClassType(this, logicElementString, 'logic-element');
        var logicElement = this.__circuitElementFactory.create(logicElementString);
        // add components
        logicElement.addComponent(this.__componentFactory.createFromPrimitive('rectangle', [30, 30]));
        // configure image
        var image = this.__assetMap.get(logicElementString);
        var displaySettings = new ImageDisplaySettings(config.LogicElement.displayLayer, null, null, image.width, image.height, image.width, image.height);
        logicElement.addComponent(this.__componentFactory.createFromDataHandle('image-handle', [image, displaySettings]));
        // configure pick action
        var pickComponent = this.__componentFactory.createFromDataHandle('pick-handle', []);
        // *** closures ***
        var labController = this.__engine.getController('lab-controller');
        function setTarget() {
            labController.setTarget(logicElement);
        };
        pickComponent.addEventListener('onpick', logicElement, setTarget);
        pickComponent.addEventListener('ondrag', logicElement, setTarget);
        logicElement.addComponent(pickComponent);
        // add terminals
        this.__addTerminal(logicElement, 'input-terminal', new Position(0, 35), new Position(0, -20));
        this.__addTerminal(logicElement, 'output-terminal', new Position(0, -35), new Position(0, 20));
        this.__container.add(logicElement);
        return logicElement;
    };

    return LogicElementFactory;
});