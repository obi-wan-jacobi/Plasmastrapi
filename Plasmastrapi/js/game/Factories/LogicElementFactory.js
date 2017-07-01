define(['factory', 'circuit-element-factory', 'logic-element', 'component-factory', 'entity-factory'],
function (Factory, CircuitElementFactory, LogicElement, ComponentFactory, EntityFactory) {

    LogicElementFactory.prototype = Object.create(Factory.prototype);
    LogicElementFactory.prototype.constructor = LogicElementFactory;
    function LogicElementFactory(game) {
        Factory.call(this, game);
        this.__componentFactory = game.getFactory(ComponentFactory);
        this.__circuitElementFactory = game.getFactory(CircuitElementFactory);
        this.__assetMap = game.getAssetMap();
    };
    // public methods
    LogicElementFactory.prototype.create = function (Type) {
        var logicElement = this.__circuitElementFactory.create(Type);
        validator.validateType(this, logicElement, LogicElement);
        // add components
        var self = this;
        // Below: Ex. PowerSource --> power-source
        var modulePrefix = Type.name.split(/(?=[A-Z])/).join('-').toLowerCase();
        //require(
        //    [
        //        modulePrefix + '-display-settings'
        //    ],
        //    function (displaySettings) {
        //        var image = this.__assetMap[0];
        //        var component = self.__componentFactory.createFromDataHandle(new ImageHandle(image, displaySettings)); // image
        //        logicElement.addComponent(component);
        //    }
        //);
        return logicElement;
    };
    LogicElementFactory.prototype.getContainer = function () { };

    return LogicElementFactory;
});