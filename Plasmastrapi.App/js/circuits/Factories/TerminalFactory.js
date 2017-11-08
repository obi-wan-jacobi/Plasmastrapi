define(['factory', 'terminal', 'image-handle', 'image-display-settings', 'utils', 'circuits-config'],
function (Factory, Terminal, ImageHandle, ImageDisplaySettings, utils, config) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(game) {
        Factory.call(this, Terminal);
        this.__componentFactory = game.getFactory('component-factory');
        this.__circuitElementFactory = game.getFactory('circuit-element-factory');
        this.__assetMap = game.getAssetMap();
    };
    // public methods
    TerminalFactory.prototype.create = function (TerminalType) {
        utils.validator.validateClassType(this, TerminalType, Terminal);
        var terminal = this.__circuitElementFactory.create(TerminalType);
        // add components
        var image = this.__assetMap.get(utils.modules.getModulePrefix(TerminalType, null));
        var displaySettings = new ImageDisplaySettings(config.Terminal.displayLayer, null, null, image.width, image.height, image.width, image.height);
        terminal.addComponent(this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)));
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

    return TerminalFactory;
});