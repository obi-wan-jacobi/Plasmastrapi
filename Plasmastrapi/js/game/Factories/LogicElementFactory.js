define(['factory', 'circuit-element-factory', 'logic-element', 'component-factory', 'entity-factory'],
function (Factory, CircuitElementFactory, LogicElement, ComponentFactory, EntityFactory) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(engine) {
        Factory.call(this, engine);
        this.__componentFactory = engine.getFactory(ComponentFactory);
        this.__circuitElementFactory = engine.getFactory(CircuitElementFactory);
    };
    // public methods
    LogicElementFactory.prototype.create = function (Type) {
        var logicElement = this.__circuitElementFactory.create(Type);
        validator.validateType(logicElement, LogicElement);
        // add components
        var self = this;
        // Below: Ex. PowerSource --> power-source
        var modulePrefix = Type.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        require(
            [
                modulePrefix + '-image',
                modulePrefix + '-display-settings'
            ],
            function (image, displaySettings) {
                var component = self.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)); // image
                logicElement.addComponent(component);
            }
        );
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () { };

    return LogicElementFactory;
});