define(['factory', 'circuit-element-factory', 'terminal', 'component-factory', 'entity-factory', 'image-handle', 'image-display-settings', 'utils'],
function (Factory, CircuitElementFactory, Terminal, ComponentFactory, EntityFactory, ImageHandle, ImageDisplaySettings, utils) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(game) {
        Factory.call(this, game);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
        this.__assetMap = game.getAssetMap();
    };
    // public methods
    TerminalFactory.prototype.create = function (TerminalType) {
        var terminal = this.__circuitElementFactory.create(TerminalType);
        utils.validator.validateType(this, terminal, Terminal);
        // add components
        var image = this.__assetMap.get(utils.modules.getModulePrefix(TerminalType, null));
        var displaySettings = new ImageDisplaySettings('game-entity-midground', null, null, image.width, image.height, image.width, image.height);
        var component = this.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)); // image
        terminal.addComponent(component);
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

    return TerminalFactory;
});

/*

Terminal.prototype.__setPoseRelativeToParentElement = function () {
    var parentElementPose = this.__parent.getComponent(PoseComponent)
    var position = parentElementPose.position;
    var orientation = parentElementPose.orientation;
    var templateX = this.__offset.x;
    var templateY = this.__offset.y;
    var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
    var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
    var poseComponent = this.getComponent(PoseComponent);
    poseComponent.position = new Position(x, y);
    poseComponent.orientation = orientation;
};

*/