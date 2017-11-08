define(['engine', 'dictionary', 'controller', 'assets', 'asset-loader', 'main-menu-scene', 'utils'],
function (Engine, Dictionary, Controller, assetUrls, AssetLoader, MainMenuScene, utils) {

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
        // order matters
        this.__addFactory('helper-factory');
        this.__addFactory('circuit-element-factory');
        this.__addFactory('wire-factory');
        this.__addFactory('terminal-factory');
        this.__addFactory('logic-element-factory');
        this.__addFactory('ui-element-factory');
    };
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    Game.prototype.__registerControllers = function () {
        this.__addController('input-controller');
        this.__addController('lab-controller');
        this.__addController('pick-controller');
        this.__addController('scene-controller');
    };
    Game.prototype.__addController = function (controllerString) {
        var ControllerType = utils.modules.require(controllerString);
        this.__controllers.add(controllerString, new ControllerType(this));
    };
    // public methods
    Game.prototype.getController = function (controllerString) {
        return this.__controllers.get(controllerString);
    };
    Game.prototype.getAssetMap = function () {
        return this.__assetLoader.get();
    };
    Game.prototype.start = function () {
        // load assets
        this.__assetLoader.download(assetUrls).done((function () {
            utils.logging.write(this, 'start', 'Assets have been loaded.');
            this.getController('scene-controller').setScene(MainMenuScene);
            Engine.prototype.start.call(this);
            utils.logging.write(this, 'start', 'We have ignition!');
        }).bind(this));
    };

	return Game;
});