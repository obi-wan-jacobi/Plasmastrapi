define(['factory', 'circuit-element-factory', 'logic-element-container', 'logic-element', 'component-factory', 'terminal-factory', 'wire-factory', 'input-terminal', 'output-terminal', 'position', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, CircuitElementFactory, LogicElementContainer, LogicElement, ComponentFactory, TerminalFactory, WireFactory, InputTerminal, OutputTerminal, Position, ImageHandle, ImageDisplaySettings, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(game) {
        Factory.call(this, LogicElement);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
        this.__terminalFactory = game.getFactory(TerminalFactory);
        this.__wireFactory = game.getFactory(WireFactory);
        this.__assetMap = game.getAssetMap();
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
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () {
        return this.__container;
    };

    return LogicElementFactory;
});