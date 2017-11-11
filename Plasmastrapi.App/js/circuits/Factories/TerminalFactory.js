define(['factory', 'terminal', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, Terminal, ImageHandle, ImageDisplaySettings, utils, config) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        Factory.call(this, engine, Terminal);
        this.__componentFactory = null;
        this.__circuitElementFactory = null;
        this.__assetMap = null;
    };
    // private methods
    TerminalFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__circuitElementFactory = this.__engine.getFactory('circuit-element-factory');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    TerminalFactory.prototype.create = function (TerminalType) {
        utils.validator.validateClassType(this, TerminalType, Terminal);
        var terminal = this.__circuitElementFactory.create(TerminalType);
        // add components
        var image = this.__assetMap.get(utils.modules.getModuleName(TerminalType));
        var displaySettings = new ImageDisplaySettings(config.Terminal.displayLayer, null, null, image.width, image.height, image.width, image.height);
        terminal.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)));
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

    return TerminalFactory;
});