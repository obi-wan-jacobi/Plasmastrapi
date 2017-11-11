define(['engine', 'assets', 'asset-loader', 'utils'],
function (Engine, assetUrls, AssetLoader, utils) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        // initialize asset loader first!
        this.__assetLoader = new AssetLoader();
        Engine.call(this, canvas);
    };
    // private methods
    Game.prototype.__registerFactories = function () {
        Engine.prototype.__registerFactories.call(this);
        // order matters
        this.__addFactory('circuit-element-factory');
        this.__addFactory('wire-factory');
        this.__addFactory('terminal-factory');
        this.__addFactory('logic-element-factory');
        this.__addFactory('ui-element-factory');
    };
    Game.prototype.__registerControllers = function () {
        Engine.prototype.__registerControllers.call(this);
        this.__addController('lab-controller');
    };
    // public methods
    Game.prototype.getAssetMap = function () {
        return this.__assetLoader.get();
    };
    Game.prototype.start = function () {
        Engine.prototype.start.call(this);
        // load assets
        this.__assetLoader.download(assetUrls).done((function () {
            utils.logging.write(this, 'start', 'Assets have been loaded.');
            this.getController('scene-controller').setScene('main-menu-scene');
            utils.logging.write(this, 'start', 'We have ignition!');
        }).bind(this));
    };

	return Game;
});