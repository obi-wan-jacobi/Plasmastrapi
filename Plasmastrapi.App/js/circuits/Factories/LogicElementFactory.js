define(['factory', 'logic-element-container', 'logic-element', 'input-terminal', 'output-terminal', 'rectangle', 'position', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, LogicElementContainer, LogicElement, InputTerminal, OutputTerminal, Rectangle, Position, ImageHandle, ImageDisplaySettings, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(game) {
        Factory.call(this, LogicElement);
        this.__engine = game;
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__terminalFactory = this.__engine.getFactory('terminal-factory');
        this.__wireFactory = this.__engine.getFactory('wire-factory');
        this.__assetMap = this.__engine.getAssetMap();
        this.__container = new LogicElementContainer();
    };
    // private methods
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
        var image = this.__assetMap.get(utils.modules.getModulePrefix(LogicElementType, null));
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
        pickComponent.addEventListener('onpick', logicElement, function () {
            labController.setTarget(logicElement);
        });
        pickComponent.addEventListener('onhover', logicElement, function () {
            console.log('hovering');
        });
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return LogicElementFactory;
});