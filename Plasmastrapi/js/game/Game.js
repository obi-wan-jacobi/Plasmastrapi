define(['engine', 'asset-urls', 'asset-loader', 'circuit-element-factory', 'logic-element-factory', 'terminal-factory'],
function (Engine, assetUrls, AssetLoader, CircuitElementFactory, LogicElementFactory, TerminalFactory) {

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
        this.__addFactory(CircuitElementFactory);
        this.__addFactory(LogicElementFactory);
        this.__addFactory(TerminalFactory);
    };
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    // public methods
    Game.prototype.getAssetMap = function () {
        return this.__assetLoader.get();
    };
    Game.prototype.start = function () {
        var self = this;
        // load assets
        this.__assetLoader.download(assetUrls).done(function () {
            console.log("Assets have been loaded.");
            Engine.prototype.start.call(self);
            console.log("We have ignition!");
        });
    };

	return Game;
});