define(['factory', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, ImageHandle, ImageDisplaySettings, utils, config) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        Factory.call(this, engine);
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
    TerminalFactory.prototype.create = function (terminalString) {
        var terminal = this.__circuitElementFactory.create(terminalString);
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        // add components
        var image = this.__assetMap.get(terminalString);
        var displaySettings = new ImageDisplaySettings(config.Terminal.displayLayer, null, null, image.width, image.height, image.width, image.height);
        terminal.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)));
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

    return TerminalFactory;
});