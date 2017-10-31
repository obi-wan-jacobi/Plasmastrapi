define(['factory', 'circuit-element-factory', 'logic-element', 'component-factory', 'terminal-factory', 'input-terminal', 'output-terminal', 'position', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, CircuitElementFactory, LogicElement, ComponentFactory, TerminalFactory, InputTerminal, OutputTerminal, Position, ImageHandle, ImageDisplaySettings, utils, config) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(game) {
        Factory.call(this, LogicElement);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
        this.__terminalFactory = game.getFactory(TerminalFactory);
        this.__assetMap = game.getAssetMap();
    };
    // public methods
    LogicElementFactory.prototype.create = function (LogicElementType) {
        utils.validator.validateClassType(this, LogicElementType, LogicElement);
        var logicElement = this.__circuitElementFactory.create(LogicElementType);
        // add components
        var image = this.__assetMap.get(utils.modules.getModulePrefix(LogicElementType, null));
        var displaySettings = new ImageDisplaySettings(config.LogicElement.displayLayer, null, null, image.width, image.height, image.width, image.height);
        var component = this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)); // image
        logicElement.addComponent(component);
        // add terminals
        var inputTerminal = this.__terminalFactory.create(InputTerminal);
        var outputTerminal = this.__terminalFactory.create(OutputTerminal);
        inputTerminal.addParent(logicElement);
        outputTerminal.addParent(logicElement);
        inputTerminal.follow(logicElement, new Position(0, 35));
        outputTerminal.follow(logicElement, new Position(0, -35));
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () { };

    return LogicElementFactory;
});