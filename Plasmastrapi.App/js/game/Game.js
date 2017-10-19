define(['engine', 'dictionary', 'controller', 'input-controller', 'pick-controller', 'scene-controller', 'assets', 'asset-loader', 'helper-factory', 'ui-element-factory', 'circuit-element-factory', 'logic-element-factory', 'terminal-factory', 'picking-tool', 'main-menu', 'logging'],
function (Engine, Dictionary, Controller, InputController, PickController, SceneController, assetUrls, AssetLoader, HelperFactory, UIElementFactory, CircuitElementFactory, LogicElementFactory, TerminalFactory, PickingTool, MainMenu, logging) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        // initialize asset loader first!
        this.__assetLoader = new AssetLoader();
        Engine.call(this, canvas);
        //// assign a singleton value that can be easily require'd
        //Game.instance = this;
        this.__controllers = new Dictionary(Controller);
        this.__registerControllers();
    };
    // private methods
    Game.prototype.__onload = function () {
        Engine.prototype.__onload.call(this);
        this.__controllers.forEach(function (key, controller) {
            controller.load();
        }, this);
    };
    Game.prototype.__onunload = function () {
        Engine.prototype.__onunload.call(this);
        this.__controllers.forEach(function (key, controller) {
            controller.unload();
        }, this);
    };
    Game.prototype.__registerFactories = function () {
        Engine.prototype.__registerFactories.call(this);
        this.__addFactory(HelperFactory);
        this.__addFactory(CircuitElementFactory);
        this.__addFactory(LogicElementFactory);
        this.__addFactory(TerminalFactory);
        this.__addFactory(UIElementFactory);
    };
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    Game.prototype.__registerControllers = function () {
        this.__addController(InputController);
        this.__addController(PickController);
        this.__addController(SceneController);
    };
    Game.prototype.__addController = function (ControllerType) {
        this.__controllers.add(ControllerType.name, new ControllerType(this));
    };
    // public methods
    Game.prototype.getController = function (ControllerType) {
        return this.__controllers.get(ControllerType.name);
    };
    Game.prototype.getAssetMap = function () {
        return this.__assetLoader.get();
    };
    Game.prototype.start = function () {
        var self = this;
        // load assets
        self.__assetLoader.download(assetUrls).done(function () {
            logging.console("Assets have been loaded.");
            self.getController(SceneController).setScene(MainMenu);
            self.getController(InputController).setHandler(PickingTool);
            Engine.prototype.start.call(self);
            logging.console("We have ignition!");
        });
    };

	return Game;
});