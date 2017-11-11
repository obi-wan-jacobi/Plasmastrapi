define(['factory', 'logic-element-container', 'logic-element', 'input-terminal', 'output-terminal', 'rectangle', 'position', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, LogicElementContainer, LogicElement, InputTerminal, OutputTerminal, Rectangle, Position, ImageHandle, ImageDisplaySettings, utils, config) {

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
    LogicElementFactory.prototype.__addTerminal = function (logicElement, TerminalType, terminalPositionOffset, wireAnchorPositionOffset) {
        var terminal = this.__terminalFactory.create(TerminalType)
        terminal.addParent(logicElement);
        terminal.follow(logicElement, terminalPositionOffset);
        this.__wireFactory.createTerminalWire(terminal, wireAnchorPositionOffset);
    };
    // public methods
    LogicElementFactory.prototype.create = function (LogicElementType) {
        var logicElement = this.__circuitElementFactory.create(LogicElementType);
        // add components
        var image = this.__assetMap.get(utils.modules.getModuleName(LogicElementType));
        var displaySettings = new ImageDisplaySettings(config.LogicElement.displayLayer, null, null, image.width, image.height, image.width, image.height);
        logicElement.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)));
        // add terminals
        this.__addTerminal(logicElement, InputTerminal, new Position(0, 35), new Position(0, -20));
        this.__addTerminal(logicElement, OutputTerminal, new Position(0, -35), new Position(0, 20));
        this.__container.add(logicElement);
        // configure pick action
        logicElement.set(new Rectangle(30, 30));
        var labController = this.__engine.getController('lab-controller');
        var pickComponent = logicElement.getComponent('pick-component');
        // *** closures ***
        function setTarget() {
            labController.setTarget(logicElement);
        };
        pickComponent.addEventListener('onpick', logicElement, setTarget);
        pickComponent.addEventListener('ondrag', logicElement, setTarget);
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return LogicElementFactory;
});