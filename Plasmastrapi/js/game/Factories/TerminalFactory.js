define(['factory', 'circuit-element-factory', 'terminal', 'component-factory', 'entity-factory'],
function (Factory, CircuitElementFactory, Terminal, ComponentFactory, EntityFactory) {

    TerminalFactory.prototype = Object.create(Factory.prototype);
    TerminalFactory.prototype.constructor = TerminalFactory;
    function TerminalFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__circuitElementFactory = engine.getFactory(CircuitElementFactory);
    };
    // public methods
    TerminalFactory.prototype.create = function (TerminalType) {
        var terminal = this.__circuitElementFactory.create(TerminalType);
        validator.validateType(terminal, Terminal);
        // add components
        var self = this;
        // Below: Ex. PowerSource --> power-source
        var modulePrefix = TerminalType.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        require(
            [
                modulePrefix + '-image',
                modulePrefix + '-display-settings'
            ],
            function (image, displaySettings) {
                var component = self.__componentFactory.createFromDataHandle(new SpriteHandle(image, displaySettings)); // sprite
                terminal.addComponent(component);
            }
        );
        return terminal;
    };
    TerminalFactory.prototype.getContainer = function () { };

    return TerminalFactory;
});