define(['factory', 'circuit-element-factory', 'terminal', 'component-factory', 'entity-factory'],
function (Factory, CircuitElementFactory, Terminal, ComponentFactory, EntityFactory) {

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
        validator.validateType(this, terminal, Terminal);
        // add components
        var self = this;
        // Below: Ex. PowerSource --> power-source
        var modulePrefix = TerminalType.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        require(
            [
                modulePrefix + '-display-settings'
            ],
            function (displaySettings) {
                var image = this.__assetMap[0];
                var component = self.__componentFactory.createFromDataHandle(new SpriteHandle(image, displaySettings)); // sprite
                terminal.addComponent(component);
            }
        );
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

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

    return TerminalFactory;
});